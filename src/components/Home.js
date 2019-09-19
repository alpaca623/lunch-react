import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";

const Container = styled.main``;

const Header = styled.header`
  margin: 10px;
  font-size: 30px;
`;

const Content = styled.div`
  margin: 10px;
`;

const ContentTitle = styled.h3``;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ContentClassfication = styled.div`
  margin: 10px;
`;

const ContentMiddleClassfication = styled.div``;

const ContentMenuTitle = styled.h4`
  margin: 10px;
`;

const ContentUserNameInput = styled.input`
  height: 30px;
`;

const ContentCategory = styled.select`
  margin: 10px;
  width: 160px;
`;

const MenuOption = styled.input.attrs({ type: "checkbox" })``;

const ContentSaveBtn = styled.button``;

const TodayContainer = styled.div`
  margin: 20px 10px 10px 10px;
`;

const TodayListHeader = styled.div`
  margin: 20px;
  color: blue;
`;
const TodayList = styled.div`
  margin: 20px;
`;

const TodayUser = styled.span`
  margin: 5px;
`;
const TodayMenu = styled.span`
  margin: 5px;
`;
const TodayPrice = styled.span`
  margin: 5px;
`;

const UpdateList = styled.div``;

const UpdateContent = styled.div``;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: [],
      typeList: [],
      menuList: [],
      option: 0,
      userName: "",
      selectType: "",
      selectMenu: "",
      handleChange: "",
      todayMenuSum: 0,
      loading: true
    };
  }
  componentDidMount = async () => {
    let menuList = [];
    let typeList = [];
    let orderList = [];
    let todayMenuSum = 0;
    try {
      typeList = (await Axios.get("http://192.168.11.150:3002/type/list")).data;
      menuList = (await Axios.get("http://192.168.11.150:3002/menu/list")).data;
      orderList = (await Axios.get(
        "http://192.168.11.150:3002/order/list?type=today"
      )).data;
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        orderList,
        menuList,
        typeList,
        todayMenuSum,
        loading: false
      });
    }
  };

  saveMenu = async e => {
    const that = this;
    try {
      const {
        userName: user,
        selectMenu: menu,
        selectType: type,
        option,
        userName,
      } = this.state;
      
      if (userName === "") {
        alert("이름을 입력해주세요");
        return;
      }
      if (menu === "") {
        alert("도시락을 선택하세요");
        return;
      }
      await Axios.post("http://192.168.11.150:3002/order/insert", {
        type,
        menu,
        user,
        option
      }).then(function() {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    });
  };

  render() {
    const { loading, typeList, menuList, orderList } = this.state;
    const types =
      typeList.length > 0 ? (
        typeList.map(type => (
          <option key={type._id} value={type._id}>
            {type.type}
          </option>
        ))
      ) : (
        <option>준비중</option>
      );

    const orders =
      orderList.length > 0 ? (
        orderList.map(order => {
          const o = menuList.filter(menu => menu._id === order.menu)[0];
          return (
            <TodayList key={order._id}>
              <TodayUser>{order.user}</TodayUser>
              <TodayMenu>{o.name}</TodayMenu>
              <TodayPrice>{`${o.price}${
                order.option ? " + 300(곱)" : ""
              }`}</TodayPrice>
            </TodayList>
          );
        })
      ) : (
        <TodayList>주문자가 없습니다.</TodayList>
      );
    return loading ? (
      <Container>준비중</Container>
    ) : (
      <Container>
        <Header>점심 도시락 주문하기 프로그램 v0.1</Header>
        <Content>
          <ContentTitle>주문하실 도시락을 골라주세요</ContentTitle>
          <ContentContainer>
            <ContentClassfication>
              <ContentMenuTitle>이름 입력</ContentMenuTitle>
              <ContentUserNameInput
                name="userName"
                onChange={this.handleChange}
              />
            </ContentClassfication>
            <ContentClassfication>
              <ContentMenuTitle>종류 선택</ContentMenuTitle>
              <ContentCategory name="selectType" onChange={this.handleChange}>
                <option value="">종류 선택</option>
                {types}
              </ContentCategory>
            </ContentClassfication>
            {this.state.selectType === "" ? (
              <ContentMiddleClassfication></ContentMiddleClassfication>
            ) : (
              <React.Fragment>
                <ContentMiddleClassfication>
                  <ContentMenuTitle>도시락 선택</ContentMenuTitle>
                  <ContentCategory
                    name="selectMenu"
                    onChange={this.handleChange}
                  >
                    <option value="">선택하세요</option>
                    {Array.isArray(menuList) ? (
                      menuList
                        .filter(menu => {
                          return menu.type === this.state.selectType;
                        })
                        .map(menu => {
                          return (
                            <option key={menu._id} value={menu._id}>
                              {`${menu.name}(${menu.price})`}
                            </option>
                          );
                        })
                    ) : (
                      <option>준비중</option>
                    )}
                  </ContentCategory>
                  곱배기
                  <MenuOption name="option" onClick={this.handleChange} />
                </ContentMiddleClassfication>
                <ContentSaveBtn onClick={this.saveMenu}>
                  저장하기
                </ContentSaveBtn>
              </React.Fragment>
            )}
          </ContentContainer>
          <TodayContainer>
            오늘의 주문 리스트
            <TodayListHeader key="0">
              <TodayUser>주문자</TodayUser>
              <TodayMenu>메뉴</TodayMenu>
              <TodayPrice>가격(곱배기)</TodayPrice>
            </TodayListHeader>
            {orders}
          </TodayContainer>
        </Content>
        <UpdateList>
          <div>추후 업데이트 예정 목록</div>
          <UpdateContent>디자인 깔끔 수정</UpdateContent>
          <UpdateContent>도시락 이미지 추가</UpdateContent>
          <UpdateContent>로그인</UpdateContent>
        </UpdateList>
      </Container>
    );
  }
}

export default withRouter(Home);

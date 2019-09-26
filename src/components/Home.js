import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";
import Result from "./Result";

const URL = "http://localhost:3002";

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

const TodayList = styled.div`
  margin: 20px;
`;

const MenuTable = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  text-align:center;
`;

const MenuTableHead = styled.thead`
  background-color:#eee;
`;

const MenuTableBody = styled.tbody``;

const MenuTableTr = styled.tr`
  border: 1px solid black;
`;

const MenuTableTd = styled.td`
  border: 1px solid black;
  width:300px;
  item-align:center;
  colspan:${props=>props.colSpan === undefined ? 0 : props.colSpan}
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
      typeList = (await Axios.get(`${URL}/type/list`)).data;
      menuList = (await Axios.get(`${URL}/menu/list`)).data;
      orderList = (await Axios.get(`${URL}/order/list?type=today`)).data;
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
    try {
      const {
        userName: user,
        selectMenu: menu,
        selectType: type,
        option,
        userName
      } = this.state;

      if (userName === "") {
        alert("이름을 입력해주세요");
        return;
      }
      if (menu === "") {
        alert("도시락을 선택하세요");
        return;
      }
      await Axios.post(`${URL}/order/insert`, {
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
            <MenuTableTr key={order._id}>
              <MenuTableTd>{order.user}</MenuTableTd>
              <MenuTableTd>{o.name}</MenuTableTd>
              <MenuTableTd>{`${o.price}${
                order.option ? " + 300(곱)" : ""
              }`}</MenuTableTd>
            </MenuTableTr>
          );
        })
      ) : (
        <MenuTableTr>
          <MenuTableTd colSpan={3}>주문자가 없습니다</MenuTableTd>
        </MenuTableTr>
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
            <MenuTable>
              <MenuTableHead>
                <MenuTableTr>
                  <MenuTableTd>주문자</MenuTableTd>
                  <MenuTableTd>메뉴</MenuTableTd>
                  <MenuTableTd>가격(곱배기)</MenuTableTd>
                </MenuTableTr>
              </MenuTableHead>
              <MenuTableBody>{orders}</MenuTableBody>
            </MenuTable>
          </TodayContainer>
        </Content>
        <Result result={this.state.orderList}/>
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

import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { requestGet, requestPost } from "../api/api";

const Container = styled.div``;

const MenuTitle = styled.input``;

const MenuPrice = styled.input``;

const MenuType = styled.select``;

const SaveBtn = styled.button``;

const BigMenu = styled.div`
  margin: 10px;
`;

const SubMenu = styled.div`
  margin: 10px;
`;

const Input = styled.input``;

const UserCreate = styled.div`
  margin: 10px;
`;

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typeList: [],
      menuList: [],
      name: "",
      price: "",
      type: "",
      user: ""
    };
  }
  // 대 분류 불러오기
  componentDidMount = async () => {
    // const { data } = await axios.get("http://192.168.11.150:3002/type/list");
    const { data } = await requestGet('/type/list');
    this.setState({ typeList: data });
  };

  // 대 분류 선택하기
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitCreateUser = async e => {
    const { user } = this.state;
    await requestPost("/user/create", { user });
  };

  // 대 분류 추가하기
  handleSubmitBigMenu = async e => {
    const { type } = this.state;
    await axios.post("http://192.168.11.150:3002/type/insert", { type });
  };

  // 중 분류 추가하기
  handleSubmitMenu = async e => {
    if (this.state.type === "") {
      alert("대 분류를 선택해라");
      return;
    }
    if (this.state.name === "") {
      alert("이름 써라");
      return;
    }
    if (this.state.price === "") {
      alert("가격을 써라");
      return;
    }
    // const { name, type, price } = this.state;
    await axios
      .post("http://192.168.11.150:3002/menu/insert", this.state)
      .then(o => {
        console.log(this.props);
        this.props.history.push("/admin");
      });
  };
  render() {
    const { typeList } = this.state;
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
    return (
      <Container>
        <UserCreate>
          유저 추가하기 :
          <Input name="user" onChange={this.handleChange} />
          <SaveBtn onClick={this.handleSubmitCreateUser}>사용자 추가</SaveBtn>
        </UserCreate>
        <BigMenu>
          분류 추가하기 :
          <Input name="type" onChange={this.handleChange} />
          <SaveBtn onClick={this.handleSubmitBigMenu}>추가</SaveBtn>
        </BigMenu>
        <SubMenu>
          메뉴 종류 :
          <MenuType name="type" onChange={this.handleChange}>
            <option>대분류 선택</option>
            {types}
          </MenuType>
          서브메뉴 이름 : <MenuTitle name="name" onChange={this.handleChange} />
          서브메뉴 가격 :{" "}
          <MenuPrice name="price" onChange={this.handleChange} />
          <SaveBtn onClick={this.handleSubmitMenu}>전송</SaveBtn>
        </SubMenu>
      </Container>
    );
  }
}

export default withRouter(Admin);

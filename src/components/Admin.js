import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div``;

const MenuTitle = styled.input``;

const MenuPrice = styled.input``;

const MenuType = styled.select``;

const MenuSave = styled.button``;

const BigMenu = styled.div`
  margin: 10px;
`;

const SubMenu = styled.div`
  margin: 10px;
`;

const MenuInput = styled.input``;

const BigMenuSave = styled.button``;

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      typeList: [],
      menuList: [],
      name: "",
      price: "",
      type: ""
    };
  }
  // 대 분류 불러오기
  componentDidMount = async () => {
    const { data } = await axios.get("http://192.168.11.150:3002/type/list");
    this.setState({ typeList: data });
  };

  // 대 분류 선택하기
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
        <BigMenu>
          분류 추가하기 :
          <MenuInput name="type" onChange={this.handleChange} />
          <BigMenuSave onClick={this.handleSubmitBigMenu}>추가</BigMenuSave>
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
          <MenuSave onClick={this.handleSubmitMenu}>전송</MenuSave>
        </SubMenu>
      </Container>
    );
  }
}

export default withRouter(Admin);

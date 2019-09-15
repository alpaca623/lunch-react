import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { requestData } from "../api/api";
import { confirmAlert } from "react-confirm-alert";

const Container = styled.div`
  align-items: center;
  height: 100%;
`;

const LoginHeader = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin: 30px 0 30px 0;
`;

const Title = styled.h1``;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserInfoInput = styled.input`
  width: 200px;
  height: 30px;
  box-shadow: none;
  margin: 10px 0 10px 0;
`;

const SomethingBtn = styled.button`
  width: 200px;
  height: 30px;
  margin-top: 30px;
`;

class Login extends React.Component {
  state = {
    userId: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  checkLogin = async e => {
    const result = await requestData(
      { method: "post", location: "/login/check" },
      { userId: this.state.userId }
    );
    console.log(result);
    if (!result.data.status) {
      confirmAlert({
        title: "login fail",
        message: "이름이 존재하지 않습니다",
        buttons: [
          {
            label: "확인",
            onClick: () => {
              return;
            }
          }
        ]
      });
    }else{
      this.props.history.push("/home");
    }
    
  };
  render() {
    return (
      <Container>
        <LoginHeader>
          <Title>도시락 주문 프로그램 v0.1</Title>
        </LoginHeader>
        <LoginContent>
          <UserInfoInput
            name="userId"
            onChange={this.handleChange}
            placeholder="이름을 입력해주세요"
          />
          {/* <UserInfoInput name="userPw"/> */}
          <SomethingBtn onClick={this.checkLogin}>Login</SomethingBtn>
          <Link to="/join">
            <SomethingBtn>Join</SomethingBtn>
          </Link>
        </LoginContent>
      </Container>
    );
  }
}

export default withRouter(Login);

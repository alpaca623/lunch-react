import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { requestData } from "../api/api";

const Container = styled.div`
  align-items: center;
  height: 100%;
`;

const JoinHeader = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin: 30px 0 30px 0;
`;

const Title = styled.h1``;

const DivTitle = styled.h3``;

const JoinContent = styled.div`
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

const BtnSpace = styled.div``;

const SomethingBtn = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 30px;
`;

class Join extends React.Component {
  state = {
    name: "",
    email: ""
  };
  handleSubmit = () => {
    if (this.state.name === "") {
      alert("이름을 입력해주세요");
      return;
    }
    confirmAlert({
      title: "test",
      message: "가입하시겠습니까?",
      buttons: [
        {
          label: "가입",
          onClick: async () => {
            const result = await requestData(
              { method: "post", location: "/user/create" },
              this.state
            );
            console.log(result.data);
            if (!result.data.status) {
              alert(result.data.message);
              return;
            } else {
              alert(`${result.data.data.name}님, 가입을 축하드려욥`);
              this.props.history.push('/');
            }
          }
        },
        {
          label: "취소",
          onClick: () => {
            return;
          }
        }
      ]
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <Container>
        <JoinHeader>
          <Title>가입</Title>
        </JoinHeader>
        <JoinContent>
          <DivTitle>이름</DivTitle>
          <UserInfoInput name="name" onChange={this.handleChange} />
          <DivTitle>이메일</DivTitle>
          <UserInfoInput name="email" onChange={this.handleChange} />

          <BtnSpace>
            <SomethingBtn onClick={this.handleSubmit}>가입하기</SomethingBtn>
            <Link to="/">
              <SomethingBtn>취소</SomethingBtn>
            </Link>
          </BtnSpace>
        </JoinContent>
      </Container>
    );
  }
}

export default withRouter(Join);

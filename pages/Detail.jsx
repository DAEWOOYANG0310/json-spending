import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  margin: 0.5rem;
  font-size: 1.2rem;
  background-color: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #5352e6;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Input = styled.input`
  padding: 0.8rem;
  margin: 0.5rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: #6c63ff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const DetailInfo = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const DetailText = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: #555;
`;

const Detail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  const fetchDetail = async () => {
    const response = await axios.get(`http://localhost:4000/lists/${id}`);
    return response.data;
  };

  const {
    data: detail,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["detail", id],
    queryFn: fetchDetail,
  });

  const deleteHandle = async () => {
    await axios.delete(`http://localhost:4000/lists/${id}`);
  };

  const updateHandle = async () => {
    await axios.put(`http://localhost:4000/lists/${id}`, editedData);
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteHandle,
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
      navigate("/");
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateHandle,
    onSuccess: () => {
      queryClient.invalidateQueries(["detail", id]);
      setEditMode(false);
    },
  });

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <DetailContainer>
      <Title>지출내역</Title>
      <Button onClick={() => navigate(-1)}>뒤로가기</Button>
      {editMode ? (
        <>
          <Input
            type="text"
            name="date"
            defaultValue={detail.date}
            onChange={handleEditChange}
            placeholder="날짜"
          />
          <Input
            type="text"
            name="category"
            defaultValue={detail.category}
            onChange={handleEditChange}
            placeholder="항목"
          />
          <Input
            type="number"
            name="amount"
            defaultValue={detail.amount}
            onChange={handleEditChange}
            placeholder="금액"
          />
          <Input
            type="text"
            name="content"
            defaultValue={detail.content}
            onChange={handleEditChange}
            placeholder="내용"
          />
          <Button onClick={() => updateMutate()}>저장</Button>
          <Button onClick={() => setEditMode(false)}>취소</Button>
        </>
      ) : (
        <>
          <DetailInfo>
            <DetailText>날짜: {detail.date}</DetailText>
            <DetailText>항목: {detail.category}</DetailText>
            <DetailText>금액: {detail.amount}</DetailText>
            <DetailText>내용: {detail.content}</DetailText>
          </DetailInfo>
          <Button onClick={() => setEditMode(true)}>수정</Button>
          <Button onClick={() => deleteMutate()}>삭제</Button>
        </>
      )}
    </DetailContainer>
  );
};

export default Detail;

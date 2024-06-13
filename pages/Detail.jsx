import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
      navigate("/"); // 삭제 후 메인 페이지로 이동
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
    <div>
      <h2>Detail</h2>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      {editMode ? (
        <>
          <input
            type="text"
            name="date"
            defaultValue={detail.date}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="category"
            defaultValue={detail.category}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="amount"
            defaultValue={detail.amount}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="content"
            defaultValue={detail.content}
            onChange={handleEditChange}
          />
          <button onClick={() => updateMutate()}>저장</button>
          <button onClick={() => setEditMode(false)}>취소</button>
        </>
      ) : (
        <>
          <p>날짜: {detail.date}</p>
          <p>항목: {detail.category}</p>
          <p>금액: {detail.amount}</p>
          <p>내용: {detail.content}</p>
          <button onClick={() => setEditMode(true)}>수정</button>
          <button onClick={() => deleteMutate()}>삭제</button>
        </>
      )}
    </div>
  );
};

export default Detail;

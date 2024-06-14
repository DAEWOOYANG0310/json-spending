import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
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

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListItem = styled(Link)`
  display: block;
  padding: 1rem;
  margin: 0.5rem;
  font-size: 1.2rem;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

const Home = () => {
  const queryClient = useQueryClient();
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [content, setContent] = useState("");

  const fetchlists = async () => {
    const response = await axios.get("http://localhost:4000/lists");
    return response.data;
  };

  const {
    data: lists,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["lists"],
    queryFn: fetchlists,
  });

  const addHandle = async (newlist) => {
    await axios.post("http://localhost:4000/lists", newlist);
  };

  const { mutate } = useMutation({
    mutationFn: addHandle,
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <HomeContainer>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({
            date: date,
            category: category,
            amount: amount,
            content: content,
          });
        }}
      >
        <Input
          type="text"
          placeholder="날짜"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="text"
          placeholder="항목"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          type="text"
          placeholder="금액"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          type="text"
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">🖋</Button>
      </Form>
      <ListContainer>
        {lists &&
          lists.map((list) => (
            <ListItem key={list.id} to={`/Detail/${list.id}`}>
              날짜:{list.date}
              항목: {list.category}
              금액:{list.amount}
              내용: {list.content}
            </ListItem>
          ))}
      </ListContainer>
    </HomeContainer>
  );
};

export default Home;

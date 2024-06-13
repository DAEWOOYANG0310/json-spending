import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    <>
      <form
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
        <input
          type="text"
          placeholder="날짜"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="항목"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="금액"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">🖋</button>
      </form>
      {lists && (
        <div>
          {lists.map((list) => (
            <Link key={list.id} to={`/Detail/${list.id}`}>
              날짜:{list.date}
              항목: {list.category}
              금액:{list.amount}
              내용: {list.content}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;

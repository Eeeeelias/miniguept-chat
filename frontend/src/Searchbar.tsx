import { createUniqueId } from "solid-js";
import { styled } from "solid-styled-components"
import { TextInput } from "./TextInput";

const baseUrl = "http://localhost:7722"

const sendRequest = (messages: string[]) =>
  fetch(`${baseUrl}/elias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: createUniqueId(),
      messages,
    })
  })

  
  const Layout = styled.div`
  padding: 3rem;
  width: 100%;
  `

export const Searchbar = () => {
  /*
  const [chat, setChat] = createSignal<string[]>([])

  const appendChat = (messages: string[]) => setChat((chat) => [...chat, ...messages])

  sendRequest([]).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
  }).then(data => {
    if ("messages" in data && Array.isArray(data.messages)) {
      appendChat(data.messages)
    }
  })
  */

  return (<Layout>
    <TextInput />
  </Layout>
  );
};

import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const messages = [
  { id: "1", text: "message1" },
  { id: "2", text: "message2" },
];
export const resolvers = {

  Query: {
    messages: () => messages,

    message: (id: string) => {

      return messages.find((message) => message.id === id);
    },

  },

  Mutation: {

    createMessage: (text: string) => {
      const newMessage = {
        id: String(messages.length + 1),
        text,
      };
      messages.push(newMessage);
      return newMessage;
    },

    updateMessage: (id: string, text: string) => {
      const message = messages.find((message) => message.id === id);
      if (!message) {
        throw new Error("Message not found");
      }
      message.text = text;
      return message;
    },

    deleteMessage: (id: string) => {
      const index = messages.findIndex((message) => message.id === id);
      if (index === -1) {
        throw new Error("Message not found");
      }
      const deletedMessage = messages.splice(index, 1)[0];
      return deletedMessage;
    },
  },

  Subscription: {
    messages: {
      subscribe: () => pubsub.asyncIterator(["NEW_MESSAGE"]), 
    },
  },
};
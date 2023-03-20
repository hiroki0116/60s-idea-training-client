import dynamic from "next/dynamic";
import { useState } from "react";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import message from "antd/lib/message";
import ExperimentOutlined from "@ant-design/icons/ExperimentOutlined";
import { Configuration, OpenAIApi } from "openai";
const CenterSpin = dynamic(() => import("components/elements/CenterSpin"), {
  ssr: false,
});

const ChatGPTInput = ({
  comment,
  setComment,
}: {
  comment: string;
  setComment: (cM: string) => void;
}) => {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // handller
  const getResult = async (): Promise<void> => {
    try {
      setLoading(true);
      const { result } = await getGPTData(input);
      setComment(comment + "\n" + result);
      setInput("");
    } catch (error) {
      message.error("Failed to fetch GPT response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-3">
      {show ? (
        loading ? (
          <CenterSpin />
        ) : (
          <>
            <Input.Search
              type="text"
              placeholder="eg. Please list a top 5 universities."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onPressEnter={() => getResult()}
              onSearch={() => getResult()}
              disabled={loading}
            />
          </>
        )
      ) : (
        <Button
          type="primary"
          onClick={() => {
            setShow(true);
          }}
          className="rounded"
          disabled={loading}
          icon={<ExperimentOutlined />}
        >
          Ask AI for HELP
        </Button>
      )}
    </div>
  );
};

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getGPTData = async (input: string): Promise<{ result: string }> => {
  if (!configuration?.apiKey) {
    message.error("API key is not set properly");
    return;
  }

  if (input.trim().length === 0) {
    message.error("Input the instruction for your AI");
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(input),
      temperature: 0.8,
      max_tokens: 400,
    });
    return { result: completion.data.choices[0].text };
  } catch (error: any) {
    message.error(error.message);
  }
};

const generatePrompt = (input) => {
  return `I am creating a document. ${input}.`;
};

export default ChatGPTInput;

import { useState } from "react";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import { Configuration, OpenAIApi } from "openai";
import message from "antd/lib/message";
import CenterSpin from "components/elements/CenterSpin";

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
    <div className="mb-2">
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
          size="small"
          onClick={() => {
            setShow(true);
          }}
          disabled={loading}
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

import Head from "next/head";
import { useRouter } from "next/router";
import { capitalizeWords } from "utils/formatter";

const HeadInfo = () => {
  const router = useRouter();
  const titleMessage = `${capitalizeWords(router.asPath.split("/")).join(
    " "
  )} | 60seconds Idea Training`;
  return (
    <Head>
      <title>{titleMessage}</title>
      <meta
        name="description"
        content="60seconds Idea Training | Train your output skill for your thinkng ability and mental health."
      />
    </Head>
  );
};

export default HeadInfo;

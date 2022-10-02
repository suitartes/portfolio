import React from "react";
import { Markup } from "react-render-markup";
import Menu from "../../components/UI/Menu";
import Template from "../../components/UI/Template";

export async function getServerSideProps() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/preview`);
  const preview = await data.json();
  return { props: { preview } };
}

export default function Artigo({ preview }) {
  const data = preview[0];
  return (
    <Template>
      <Markup markup={data.post} />
      <Menu />
    </Template>
  );
}

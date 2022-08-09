import React from "react";
import { useQuerySubscription } from "react-datocms";
import Template from "../../components/Template";
import NavPortfolio from "../../components/NavPortfolio";
import { request } from "../../lib/datocms";
import CardPortfolio from "../../components/CardPortfolio";
import usePagination from "../../Hooks/usePagination";

const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  allPortfolios(first: $limit) {
    title,
    shortdescription,
    description,
    category,
    id
    }
  }`;

export async function getStaticProps() {

  const graphqlRequest = {
    query: HOMEPAGE_QUERY,
    variables: { limit: 5 },
  };

  return {
    props: {
      subscription: {
        ...graphqlRequest,
        initialData: await request(graphqlRequest),
        token: process.env.NEXT_PUBLIC_DATO_TOKEN,
      },
    },
  };
}



export default function Home({ subscription }) {
  const { data } = useQuerySubscription(subscription);
  const {
    pagination,
    botaoMostrarMais
  } = usePagination();

  return (
    <Template nav={<NavPortfolio data={data} />} >

      {data.allPortfolios.slice(0, pagination).map((element) => {
        return (
          <CardPortfolio
            Title={element.title}
            ShortDescription={element.shortdescription}
            Category={element.category}
            id={element.id} />
        )
      })
      }
      {botaoMostrarMais(data.allPortfolios.length)}
    </Template>
  )
}

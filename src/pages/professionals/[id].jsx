import { getProfessionals, getProfessional } from '../../lib/api';

export async function getStaticProps({ params }) {
  const { id } = params;
  const professional = await getProfessional(id)

  return {
    props: { id, professional },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const professionals = await getProfessionals();

  const paths = professionals.data.map(professional => {
    return {
      params: { 'id': professional.id },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  };
}

export default function Profile(props) {
  return <div>{props.professional.bio}</div>
}
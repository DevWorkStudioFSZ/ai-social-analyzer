
// pages/results.jsx
import { useRouter } from 'next/router';
import Layout from '../components/Layout'; // ✅ Reuse the layout
import ResultsCard from '../components/ResultsCard';

export default function ResultsPage() {
  const router = useRouter();
  const { data } = router.query;

  if (!data) return <p>Loading...</p>;

  const parsedData = JSON.parse(data);

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="card shadow-lg p-4" style={{ maxWidth: '700px', width: '100%', background: '#fff' }}>
          <ResultsCard data={parsedData} />
        </div>
      </div>
    </Layout>
  );
}

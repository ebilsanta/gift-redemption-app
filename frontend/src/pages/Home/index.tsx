import useHome from './useHome';
import SearchBar from '../../components/SearchBar';
import PaginatedTable from '../../components/PaginatedTable';

function Home() {
  const { data, setSearchQuery } = useHome();
  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      <PaginatedTable data={data}/>
    </div>
  );
};

export default Home;

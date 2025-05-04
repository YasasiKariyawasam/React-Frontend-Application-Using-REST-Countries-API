export default function Filter({ onFilter }) {
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
    return (
      <select 
        onChange={(e) => onFilter(e.target.value)}
        className="px-4 py-2 rounded shadow"
      >
        <option value="">Filter by Regions</option>
        {regions.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
    );
  }
import { useState, useEffect } from 'react';
import './style.css';

interface Country {
  label: string;
  value: string;
}

interface University {
  name: string;
  domains: string[];
}

const countries: Country[] = [
  {
    label: 'Kazakhstan',
    value: 'kazakhstan'
  },
  {
    label: 'Iran',
    value: 'iran'
  },
];

function App() {
  const [filter, setFilter] = useState('');
  const [country, setCountry] = useState(countries[0].value);
  const [list, setList] = useState<University[]>([]);

  useEffect(() => {
    fetch('./docs/kazakhstan.json')
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  return (
    <>
      <h1>Что нужно сделать</h1>
      <ol>
        <li>Исправить баг почему в селекте дефолтное значение Iran вместо Kazakhstan</li>
        <li>Добавить запрос к соответствующему json при переключении страны. json лежат в public/docs</li>
        <li>Реализовать фильтр, в который на лету будет фильтровать список по столбцу таблицы "Name university"</li>
        <li>Добавить подсветку всех вхождений из фильтра в столбце таблицы "Name university"</li>
      </ol>
      <h2 className="h2 p-3">Universities</h2>
      <div className="d-flex p-3">
        <div className="">
          <label className="d-block">Filter</label>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="ms-5">
          <label className="d-block">Countries</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map(({ label, value }) => (
              <option key={value} value="value">
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="table m-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name university</th>
            <th scope="col">Domains</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, i) => (
            <tr key={i}>
              <th scope="row">{i}</th>
              <td>{item.name}</td>
              <td>
                {item.domains.map((domain) => (
                  <span key={domain}>{domain}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;


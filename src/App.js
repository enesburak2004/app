import React from 'react';
import { Collapse } from 'antd';
import 'antd/dist/reset.css'; // Ant Design stilleri

const { Panel } = Collapse;

const AccordionMenu = ({ onLinkClick, onContentClick }) => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Collapse
      defaultActiveKey={['1']}
      onChange={onChange}
      accordion
      style={{ flexGrow: 1 }}
    >
      <Panel header="Seçenek 1" key="1" style={{ marginBottom: '15px' }}>
        <p onClick={() => onContentClick('Seçenek 1 İçeriği')}>
          Seçenek 1 İçeriği (Tıklanabilir)
        </p>
      </Panel>
      <Panel header="Seçenek 2" key="2" style={{ marginBottom: '15px' }}>
        <p onClick={() => onContentClick('Seçenek 2 İçeriği')}>
          Seçenek 2 İçeriği (Tıklanabilir)
        </p>
      </Panel>
      <Panel header="Seçenek 3" key="3" style={{ marginBottom: '15px' }}>
        <p onClick={() => onContentClick('Seçenek 3 İçeriği')}>
          Seçenek 3 İçeriği (Tıklanabilir)
        </p>
      </Panel>
      <Panel header="Seçenek 4 - URL ile" key="4" style={{ marginBottom: '15px' }}>
        <p>
          Bu seçenekte bir{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); onLinkClick(); }}>
            URL bağlantısına
          </a>{' '}
          gidin.
        </p>
      </Panel>
    </Collapse>
  );
};

const App = () => {
  const [content, setContent] = React.useState(''); // Seçilen içerik durumu
  const [url, setUrl] = React.useState(''); // URL durumu

  const handleLinkClick = () => {
    setUrl('https://www.example.com'); // URL güncelleniyor
  };

  const handleContentClick = (content) => {
    setContent(content); // İçerik güncelleniyor
    setUrl(''); // URL sıfırlanıyor ki içerik görünür olsun
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Üstte Beyaz Bölüm */}
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderBottom: '1px solid #f0f0f0' }}>
        <h2>Üst Bölüm</h2>
      </div>

      {/* İçerik Alanı */}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* Sol Menü */}
        <div style={{ backgroundColor: '#f0f2f5', padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <AccordionMenu onLinkClick={handleLinkClick} onContentClick={handleContentClick} />
        </div>

        {/* Sağ İçerik Alanı */}
        <div style={{ flexGrow: 1, padding: '20px' }}>
          {url ? (
            <iframe src={url} style={{ width: '100%', height: '100%', border: 'none' }} title="Content" />
          ) : content ? (
            <div>
              <h1>{content}</h1>
              <p>{content} ile ilgili detaylı bilgi burada gösterilecektir.</p>
            </div>
          ) : (
            <div>
              <h1>İçerik Alanı</h1>
              <p>Burası ana içerik alanıdır. Akordiyon menüden bir seçenek seçildiğinde ilgili içerik burada gösterilebilir.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

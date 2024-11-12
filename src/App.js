import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, IconButton, Typography, useMediaQuery, Drawer } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './App.css';

const AccordionMenu = ({ onLinkClick, onContentClick, closeMenu }) => {
  const [openExtras, setOpenExtras] = useState({
    1: false, 2: false, 3: false, 4: false
  });

  const toggleExtraContent = (key) => {
    setOpenExtras((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  
  const handleOptionClick = (key, content, url) => {
    if (url) {
      onLinkClick(url);
    } else {
      onContentClick(content);
    }
    closeMenu();
  };

  return (
    <div style={{ flexGrow: 1 }}>
      {[1, 2, 3, 4].map((key) => {
        const urlMap = {
          1: 'https://www.example.com',
          2: 'https://www.example2.com',
          3: 'https://www.example3.com',
          4: 'https://www.example4.com',
        };
        return (
          <Accordion key={key} sx={{ marginBottom: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Seçenek {key}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography onClick={() => handleOptionClick(key, `Seçenek ${key} İçeriği`, urlMap[key])}>
                Seçenek {key} İçeriği (Tıklanabilir)
              </Typography>
              {openExtras[key] && (
                <Typography style={{ marginLeft: '20px' }}>
                  - Bu seçenekte bir <a href="#" onClick={(e) => { e.preventDefault(); handleOptionClick(key, null, urlMap[key]); }}>URL bağlantısına</a> gidin.
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

const App = () => {
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleLinkClick = (link) => {
    setUrl(link);
    setIsMenuOpen(false);
  };

  const handleContentClick = (content) => {
    setContent(content);
    setUrl('');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Üst Bölüm */}
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Üst Bölüm</h2>
        {isMobile && (
          <IconButton onClick={toggleMenu}>
            {isMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
          </IconButton>
        )}
      </div>

      {/* İçerik Alanı */}
      <div style={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
        {/* Mobil Menü */}
        {isMobile && (
          <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
            <div style={{ width: '250px', padding: '20px' }}>
              <AccordionMenu onLinkClick={handleLinkClick} onContentClick={handleContentClick} closeMenu={() => setIsMenuOpen(false)} />
            </div>
          </Drawer>
        )}

        {/* Masaüstü Sol Menü */}
        {!isMobile && (
          <div style={{
            backgroundColor: '#f0f2f5',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            width: '250px',
          }}>
            <AccordionMenu onLinkClick={handleLinkClick} onContentClick={handleContentClick} closeMenu={() => {}} />
          </div>
        )}

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

      {/* Alt Bölüm */}
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', display: 'flex' }}>
        <div style={{ flex: 1, padding: '10px' }}>
          <h3>Bölüm 1</h3>
          <p>Bu bölüm, sayfanın alt kısmında birinci sütundur.</p>
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          <h3>Bölüm 2</h3>
          <p>Bu bölüm, sayfanın alt kısmında ikinci sütundur.</p>
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          <h3>Bölüm 3</h3>
          <p>Bu bölüm, sayfanın alt kısmında üçüncü sütundur.</p>
        </div>
      </div>
    </div>
  );
};

export default App;

'use client';

import { useState } from 'react';

type Gjendja = 'fillim' | 'duke-kerkuar' | 'sukses' | 'refuzuar' | 'gabim' | 'pa-mbeshtetje';

function pershkruajGabimin(error: GeolocationPositionError) {
  if (error.code === error.PERMISSION_DENIED) return 'Leja u refuzua. Mund ta shkruash vendtakimin më poshtë.';
  if (error.code === error.POSITION_UNAVAILABLE) return 'Vendndodhja nuk është e disponueshme. Mund ta shkruash vendtakimin.';
  return 'Kërkesa për vendndodhje përfundoi pa rezultat. Mund ta shkruash vendtakimin.';
}

export function PikaNisjes() {
  const [gjendja, setGjendja] = useState<Gjendja>('fillim');
  const [mesazhi, setMesazhi] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [vendtakimi, setVendtakimi] = useState('');
  const [vendtakimiRuajtur, setVendtakimiRuajtur] = useState('');

  function perdorVendndodhjen() {
    setMesazhi('');
    setGjendja('duke-kerkuar');

    if (!('geolocation' in navigator)) {
      setGjendja('pa-mbeshtetje');
      setMesazhi('Pajisja ose shfletuesi nuk e mbështet vendndodhjen.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(Number(position.coords.latitude.toFixed(4)));
        setLongitude(Number(position.coords.longitude.toFixed(4)));
        setGjendja('sukses');
        setMesazhi('Pika e nisjes u mor me sukses.');
      },
      (error) => {
        setGjendja(error.code === error.PERMISSION_DENIED ? 'refuzuar' : 'gabim');
        setMesazhi(pershkruajGabimin(error));
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  }

  function ruajVendtakimin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const vlera = vendtakimi.trim();
    if (!vlera) return;
    setVendtakimiRuajtur(vlera);
    setMesazhi('Vendtakimi u ruajt si alternativë manuale.');
  }

  const duhetAlternativa = gjendja === 'refuzuar' || gjendja === 'gabim' || gjendja === 'pa-mbeshtetje';

  return (
    <section className="location-box" aria-labelledby="pika-nisjes-title">
      <h2 id="pika-nisjes-title">Pika e nisjes</h2>
      <p>Leja kërkohet vetëm pasi të shtypësh butonin.</p>
      <button className="action" type="button" onClick={perdorVendndodhjen} disabled={gjendja === 'duke-kerkuar'}>
        {gjendja === 'duke-kerkuar' ? 'Po kërkoj vendndodhjen…' : 'Përdor vendndodhjen time'}
      </button>
      {mesazhi && <p role="status">{mesazhi}</p>}
      {gjendja === 'sukses' && latitude !== null && longitude !== null && (
        <p className="location-summary" data-testid="location-summary">
          Koordinatat e pikës së nisjes: {latitude}, {longitude}
        </p>
      )}
      {(duhetAlternativa || vendtakimiRuajtur) && (
        <form className="manual-location" onSubmit={ruajVendtakimin}>
          <label htmlFor="vendtakimi">Shkruaj vendtakimin</label>
          <input id="vendtakimi" name="vendtakimi" value={vendtakimi} onChange={(event) => setVendtakimi(event.target.value)} placeholder="p.sh. Biblioteka e AAB-së" />
          <button className="action" type="submit" disabled={!vendtakimi.trim()}>Ruaj vendtakimin</button>
          {vendtakimiRuajtur && <p data-testid="manual-location-summary">Vendtakimi: {vendtakimiRuajtur}</p>}
        </form>
      )}
    </section>
  );
}

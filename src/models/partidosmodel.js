import { db } from '../index.js';
import {
  addDoc,
  getDocs,
  getDoc,
  doc,
  collection,
  query,
  where,
  updateDoc
} from 'firebase/firestore';

async function crearPartido(
  id,
  torneo,
  equipo_local,
  equipo_visitante,
  goles_local,
  goles_visitante,
  fecha,
  estado,
  resultado
) {
  try {
    const docRef = await addDoc(collection(db, 'partidos'), {
      id,
      torneo,
      equipo_local,
      equipo_visitante,
      goles_local,
      goles_visitante,
      fecha,
      estado,
      resultado,
    });
    console.log('Partido creado con ID:', docRef.id);
  } catch (e) {
    console.error('Error al crear el partido', e);
    throw e;
  }
}

async function consultarPartidoPorId(idBuscado) {
  try {
    const q = query(collection(db, 'partidos'), where('id', '==', idBuscado));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
      };
    } else {
      return null;
    }
  } catch (e) {
    console.error('Error al consultar partido por ID:', e);
    throw e;
  }
}

async function consultarPartidos() {
  try {
    const querySnapshot = await getDocs(collection(db, 'partidos'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error('Error al consultar partidos:', e);
    throw e;
  }
}

async function actualizarResultadoPartido(idBuscado, goles_local, goles_visitante, resultado) {
  try {
    const q = query(collection(db, 'partidos'), where('id', '==', idBuscado));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const partidoRef = doc(db, 'partidos', snapshot.docs[0].id);
      await updateDoc(partidoRef, {
        goles_local,
        goles_visitante,
        resultado,
      });
    }
  } catch (e) {
    console.error('Error al actualizar resultado del partido:', e);
    throw e;
  }
}

async function actualizarEstadoPartido(idBuscado, estado) {
  try {
    const q = query(collection(db, 'partidos'), where('id', '==', idBuscado));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const partidoRef = doc(db, 'partidos', snapshot.docs[0].id);
      await updateDoc(partidoRef, { estado });
    }
  } catch (e) {
    console.error('Error al actualizar estado del partido:', e);
    throw e;
  }
}

export {
  crearPartido,
  consultarPartidoPorId,
  consultarPartidos,
  actualizarResultadoPartido,
  actualizarEstadoPartido,
};

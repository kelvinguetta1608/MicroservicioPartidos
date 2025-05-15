import { Router } from 'express';
import {
  crearPartido,
  consultarPartidoPorId,
  consultarPartidos,
  actualizarResultadoPartido,
  actualizarEstadoPartido,
} from '../models/partidosmodel.js';

const router = Router();

router.post('/partidos', async (req, res) => {
  const {
    id,
    torneo,
    equipo_local,
    equipo_visitante,
    goles_local,
    goles_visitante,
    fecha,
    estado,
    resultado,
  } = req.body;

  try {
    await crearPartido(
      id,
      torneo,
      equipo_local,
      equipo_visitante,
      goles_local,
      goles_visitante,
      fecha,
      estado,
      resultado
    );
    res.status(201).send('Partido creado');
  } catch (error) {
    res.status(500).send('Error al crear el partido');
  }
});

router.get('/partidos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const partido = await consultarPartidoPorId(id);
    if (partido) {
      res.json(partido);
    } else {
      res.status(404).send('Partido no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al consultar el partido');
  }
});

router.get('/partidos', async (req, res) => {
  try {
    const partidos = await consultarPartidos();
    res.json(partidos);
  } catch (error) {
    res.status(500).send('Error al consultar partidos');
  }
});

router.put('/partidos/:id/resultado', async (req, res) => {
  const { id } = req.params;
  const { goles_local, goles_visitante, resultado } = req.body;

  try {
    await actualizarResultadoPartido(id, goles_local, goles_visitante, resultado);
    res.send('Resultado actualizado');
  } catch (error) {
    res.status(500).send('Error al actualizar el resultado');
  }
});

router.put('/partidos/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    await actualizarEstadoPartido(id, estado);
    res.send('Estado actualizado');
  } catch (error) {
    res.status(500).send('Error al actualizar el estado');
  }
});

export default router;

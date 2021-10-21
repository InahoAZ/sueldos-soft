import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import swal from 'sweetalert';

import EmpresaService from '../../services/empresa.service'
import PuestoService from '../../services/puesto.service'
import Editarpuesto from './editpuestos.component'






export default class ListarPuesto extends Component {

  constructor(props) {
    super(props);

    this.retrievePuestos = this.retrievePuestos.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.deletePuesto = this.deletePuesto.bind(this);
    this.state = {
      puestos: [
        {
          id: '3333',
          name: 'ERROR',
          empresaname: 'ningubo'
        },
      ],
    };
    this.empresas = [
      {
        id: '8r38ru3',
        name: 'erroror',
        areas: [
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '8r38ru3',
        name: 'erroror',
        areas: [
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '8r38ru3',
        name: 'erroror',
        areas: [
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '8r38ru3',
        name: 'erroror',
        areas: [
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
          {
            id: '8r38ru3',
            name: 'erroror',
            departamentos: [
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
              {
                id: '8r38ru3',
                name: 'erroror',
                puestos: [
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                  {
                    id: '8r38ru3',
                     name: 'erroror',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

  }

  obtenerPuestos(empresas) {
    console.log(empresas);
    let rows = [];
    for (let i = 0;i<empresas.length;i++){
      
      if (empresas[i].areas){
        
        for (let j = 0;j<empresas[i].areas.length;j++){
          
          if (empresas[i].areas[j].departamentos){
           
            for (let d = 0;d<empresas[i].areas[j].departamentos.length;d++){
              
              if (empresas[i].areas[j].departamentos[d].puestos){
                for (let p = 0;p<empresas[i].areas[j].departamentos[d].puestos.length;p++){
                  
                  let puesto = {
                    id: empresas[i].areas[j].departamentos[d].puestos[p]._id,
                    name: empresas[i].areas[j].departamentos[d].puestos[p].name,
                    departamentoname: empresas[i].areas[j].departamentos[d].name,
                    areaname: empresas[i].areas[j].name,
                    empresaname: empresas[i].name,
                  }
                  rows.push(puesto)

                }

              }
            }
          }
        }
      }
    }



    return rows
  }

  componentDidMount() {
    this.retrievePuestos();
  }

  retrievePuestos() {
    EmpresaService.getAll()
      .then(response => {
        //paso intermedio transformar las empresas a solo las que poseen puestos
        
        this.setState({
          puestos: this.obtenerPuestos(response.data)
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePuestos();
  }


  deletePuesto(num) {

    swal({
      title: "Esta seguro?",
      text: "Una vez borrado no se puede recuperar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {


          PuestoService.delete(num)
            .then(response => {
              console.log(response.data);
              //eliminado correctamente msj
              swal("Se ha borrado!", {
                icon: "success",
              });
              //actualizar tabla
              this.refreshList()
            })
            .catch(e => {
              console.log(e);
              swal("Error!", "no se logro borrar", "error");
            });



        } else {
          swal("Cancelado!");
        }
      });


  }


  render() {


    const { puestos } = this.state;

    return (
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">



        <Grid>
          <Typography variant="h5" >
            Puestos
          </Typography>

          <br></br>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="center">Departamento</TableCell>
                  <TableCell align="center">Area</TableCell>
                  <TableCell align="center">Empresa</TableCell>
                  <TableCell align="right">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {puestos.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">

                      {row.departamentoname} 
                    </TableCell>
                    <TableCell align="center">

                      {row.areaname}
                    </TableCell>
                    <TableCell align="center">

                      {row.empresaname} 
                    </TableCell>


                    <TableCell align="right">
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <Grid>
                          <Editarpuesto
                            puestoid={row.id}
                            puestoname={row.name}
                            refreshList={this.refreshList}
                          />
                        </Grid>
                        <Grid>
                          <IconButton color="secondary" onClick={() => this.deletePuesto(row.id)}>
                            <DeleteForeverIcon />
                          </IconButton>
                        </Grid>
                      </Grid>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>



      </Grid>

    );
  }








}


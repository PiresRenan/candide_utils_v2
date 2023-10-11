import Link from 'next/link';
import styles from '../styles/Home.module.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import DescriptionIcon from '@mui/icons-material/Description';

export default function Home() {
  return (
    <main>
      <Container>
        <Box style={{ alignItems: 'center', display: 'flex', height: '90vh', justifyContent: 'center', width: '100%' }}>
          <Card className={ styles.principal }>
            <Typography
              variant='h2'
              sx={{
                alignItems: 'center',
                borderBottom: '1px solid #fff',
                color: '#fff',
                display: 'flex',
                fontSize: '1.75rem',
                justifyContent: 'center',
                padding: '1rem 0',
                whiteSpace: 'nowrap',
              }}
            >
              NOTAS DE IMPORTAÇÃO
            </Typography>
            <Typography 
              variant='h5'
              sx={{
                alignItems: 'center',
                color: '#fff',
                display: 'flex',
                fontSize: '1rem',
                justifyContent: 'center',
                padding: '1rem 0 5rem 0',
                whiteSpace: 'nowrap',
              }}
            >
              Bem vindo
            </Typography>
            <Typography 
            variant='h6'
            sx={{
              alignItems: 'center',
              color: '#fff',
              display: 'flex',
              fontSize: '1rem',
              justifyContent: 'center',
              padding: '1rem 0 2rem 0',
              whiteSpace: 'nowrap',
            }} 
            >A seguir, escolha qual deseja gerar:</Typography>
            <Container sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}>
              <Link 
              href={'/master'}
              className={ styles.lBtn }
              >
                Master
                <DescriptionIcon />
              </Link>
              <Link 
              href={'/children'}
              className={ styles.lBtn }
              >
                Derivadas
                <DescriptionIcon sx={{ width: '15vh' }}/>
              </Link>
            </Container>
          </Card>
        </Box>
      </Container>
    </main>
  )
}

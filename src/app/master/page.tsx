'use client';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { parseString } from 'xml2js';

import styles from '@/styles/Master.module.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Master() {
    const [nomeContainer, setNomeContainer] = useState<string>('');
    const [qtdContainers, setQtdContainers] = useState<number>(0);
    const [nPiDolar, setNPiDolar] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
        else {
            alert("Arquivo inválido!");
        }
    }

    return (
        <main>
            <Container>
                <Box style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', height: '90vh' }}>
                    <Card className={ styles.CardM }>
                        <Card className={ styles.logo }>
                            <Link href={'/'}>
                                <Image src={'/logo.png'} alt='Candide Ind e Com' width={125} height={125} style={{ backgroundColor: 'transparent' }} />
                            </Link> 
                        </Card>

                        <Card className={ styles.head }>
                            <Typography variant="h2" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>Master</Typography>
                        </Card>
                        <Card className={ styles.getOutterInfo }>
                            <TextField
                                fullWidth
                                id="nome_container"
                                label="Nome do container Master"
                                type="text"
                                variant="standard"
                                InputProps={{ style: { color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#fff', } }}
                                onChange={(e) => {
                                    setNomeContainer(e.target.value);
                                }}
                            />
                            <TextField 
                                fullWidth 
                                id="n_container" 
                                label="Quantidade de containers" 
                                type='number' 
                                variant="standard" 
                                InputProps={{ style: { color: '#fff' } }}
                                InputLabelProps={{ style: { color: '#fff', } }}
                                onChange={(e) => { 
                                    parseInt(e.target.value) >= 0 ? setQtdContainers(parseInt(e.target.value)) : alert("O valor deve ser maior ou igual a 0 (zero)")
                                }} 
                            />
                            <TextField 
                                fullWidth 
                                id="n_pi_dolar" 
                                label="Nº da PI em dólar(US$)" 
                                type='text' 
                                variant="standard" 
                                InputProps={{ style: { color: '#fff', } }}
                                InputLabelProps={{ style: { color: '#fff', } }}
                                onChange={(e) => { setNPiDolar(e.target.value) }} />
                        </Card>
                        {selectedFile ? 
                        <Card className={ styles.Poster } onClick={(e) => {
                            alert("Arquivo removido com sucesso!");
                            setSelectedFile(null);
                        }}>
                            <Container sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                                backgroundColor: 'rgba(0, 0, 0,.85)', 
                                color: '#fff', 
                                borderRadius: '0', 
                                borderLeft: '#fff solid 2px',
                                borderTop: '#fff solid 2px', 
                                borderRight: '#fff solid 2px',
                            }}>
                                <p style={{ cursor: 'default', fontSize: '1rem', marginBottom: '.5rem' }}>Arquivo selecionado:</p>
                                <Typography variant="h6" style={{ alignItems: 'center', cursor: 'pointer', display: 'flex', justifyContent: 'center', padding: '2rem', width: '100%', height: '3.5rem',  }}>
                                    {selectedFile && selectedFile.name.length > 20 ? selectedFile.name.substring(0, 20) + "..." : selectedFile?.name}
                                </Typography> 
                            </Container>
                        </Card>
                        :
                        <Button component="label" variant="contained" startIcon={ <CloudUploadIcon /> } style={{ width: '100%', height: '3.5rem', backgroundColor: 'rgba(0, 0, 0,.85)', color: '#fff', borderRadius: '0', borderLeft: '#fff solid 2px', borderTop: '#fff solid 2px', borderRight: '#fff solid 2px' }} >
                            Enviar Arquivo
                            <input type="file" id="file-upload" accept=".xml" style={{ display: 'none' }} onChange={(e) => { handleFile(e); }} />
                        </Button>
                        }
                        <Button 
                        component="label" 
                        variant="contained" 
                        style={{ 
                            width: '100%', 
                            height: '3.5rem', 
                            backgroundColor: 'rgba(0, 0, 0,.85)', 
                            color: '#fff', 
                            borderRadius: '0 0 15px 35px', 
                            border: '#fff solid 2px' 
                        }}  
                        onClick={() => {
                            const nC = nomeContainer;
                            const qC = qtdContainers;
                            const nPD = nPiDolar;
                            const sF = selectedFile;
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const xml = e.target?.result as string;
                                parseString(xml, (error: any, result: any) => {
                                    if (error) {
                                        console.error(error);
                                    } else {
                                        result.ContainerName = nC;
                                        result.QuantityContainers = qC;
                                        result.nPIDolar = nPD;
                                        const json = JSON.stringify(result);
                                        fetch('http://127.0.0.1:8000/items/', {
                                            method: 'POST',
                                            body: json,
                                            headers: {
                                                'Content-Type': 'application/json'
                                            }
                                        })
                                        .then(response => response.json())
                                        .then(data => console.log(data))
                                        .catch(error => console.error(error));
                                    }
                                });
                            };
                            if (sF) {
                                reader.readAsText(sF);
                                console.log(
                                        'O nome do container é:' +
                                        nC + 
                                        ", Quantidade de container é: " + 
                                        qC +
                                        ", PI em dolá: " + 
                                        nPD +
                                        ", nome do arquivo: " +
                                        sF?.name 
                                );
                            } else {
                                console.log('Nenhum arquivo selecionado');
                            }
                        }}
                        >
                            CRIAR NOTA MASTER
                        </Button>
                    </Card>
                </Box>
            </Container>
        </main>
    )
}

import { Grid, MenuItem } from "@mui/material"
import styled from "styled-components"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import React from "react";

interface Navbarprops {
    onAddApp: (id: string, name: string, color: string) => void
}

const arrayApps = [
    { id: "1", name: "Hadoop", count: 0, color: "#f50057" },
    { id: "2", name: "Rails", count: 0, color: "#3f51b5" },
    { id: "3", name: "Chronos", count: 0, color: "#00bcd4" },
    { id: "4", name: "Storm", count: 0, color: "#4caf50" },
    { id: "5", name: "Spark", count: 0, color: "#8bc34a" },
  ]

const NavBar: React.FC<Navbarprops> = ({ onAddApp }) => {

    const IconWrapper = styled.div(() => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        cursor: "pointer",
        margin: "1rem 0",
        paddingTop: "30%"
    }));

    const Container = styled("div")(() => ({
        position: "fixed",
        left: "0",
        top: "0",
        bottom: "0",
        width: "250px",
        backgroundColor: "#2c3034",
    }))


    const AppContent = styled.div(() => ({
        display: "flex",
        flexDirection: "column",
        marginTop: "4em",
        paddingLeft: "2em",
    }))

    const SubTitle = styled("div")(() => ({
        color: "#575e64",
        fontSize: "16px",
        position: "relative",
        marginLeft: "2em",
    }))

    const ItemBlock = styled.div<{ borderColor: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.6em 3em;
    margin: 0.5em;
    background-color: #1f2225;
    border-left: 4px solid ${(props) => props.borderColor};
    border-radius: 8px;
    color: #fff;
  `;

    return(
        <Container>
            <Grid container spacing={2} columns={8} alignItems="center">
                <Grid size={4}>
                    <IconWrapper>
                        <AddCircleOutlineIcon />
                        <MenuItem> Novo Servidor </MenuItem>
                    </IconWrapper>
                </Grid>
                <Grid size={4}>
                    <IconWrapper>
                        <RemoveCircleOutlineIcon/>
                        < MenuItem> Destruir </MenuItem>
                    </IconWrapper>
                </Grid>
            </Grid>
            <AppContent>
                <SubTitle> Apps Disponíveis </SubTitle>
                {arrayApps.map((arrayApp) => (
                    <ItemBlock key={arrayApp.name} borderColor={arrayApp.color}>
                        <span style={{ display: "flex", marginRight: "1em" }}>{arrayApp.name}</span>
                        <span style={{ display: "flex", marginRight: "1em" }}>{arrayApp.count}</span>
                        <div style={{ display: "flex", gap: "0.9em" }}>
                        <RemoveCircleOutlineIcon style={{ color: "#aaa", cursor: "pointer" }} />
                        <AddCircleIcon 
                            style={{ color: arrayApp.color, cursor: "pointer" }}
                            onClick={() => onAddApp(arrayApp.id, arrayApp.name, arrayApp.color)}    
                        />
                        </div>
                    </ItemBlock>
                    ))}
            </AppContent>
        </Container>

    )
}

export default NavBar
import styled from 'styled-components'
import { Box, Grid } from '@mui/material'
import { ClusterApp } from '../../App'

interface DashboardProps{
  pad: ClusterApp[];
  addServers: number[];
}

const Dashboard: React.FC<DashboardProps> = ({ pad, addServers}) => {

    const StyleBody = styled("body")(() => ({
        width: "calc(100% - 360px)",
        padding: "32px",
        margin: "32px",
        marginLeft: "auto",
      }))
    
      const Title = styled("h2")(() => ({
        color: "#ffff",
        fontSize: "12",
        position: "absolute",
        top: "2px"
      }))
    
      const Blocks = styled("div")(() => ({
        width: "280px",
        height: "190px",
        backgroundColor:"#343a40",
        borderRadius: "5px",
      }))

      const formatTime = (date: Date) => {
        const time = Math.floor(( new Date().getTime() - new Date(date).getTime()) / 60000); 
        return time === 0 ? 'Added just now' : `Added ${time} minute(s) ago`;
      }

    return (
        <StyleBody>
        <Title> Quadro de servidores </Title>
        <Box sx={{ flexGrow: 1}}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 2, md: 12 }}>
            {pad.map((server, index) => (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                <Blocks style={{ borderTop: `4px solid ${server.color}` }}>
                  <strong 
                    style={{ color: "#ffff", display: "flex", padding: "2em", justifyContent:"center" }}>
                      {server.name}
                  </strong>
                  <span 
                    style={{ color: "black", display: "flex", padding: "1em", justifyContent: "center", fontSize: "12px"  }}>
                      {formatTime(server.createdAt)}
                  </span>
                </Blocks>
              </Grid>
              ))}
                {addServers.map((_, index) => (
                  <Grid key={`empty-${index}`} spacing={{xs: 2, sm: 4 ,md: 4}}>
                    <Blocks style={{ opacity: 0.2 }} />
                  </Grid>
                ))}
          </Grid>
        </Box>
      </StyleBody>
    )
}

export default Dashboard
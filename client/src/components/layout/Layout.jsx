import { Box, Container } from '@mui/material';
import TabBar from '../tabBar/TabBar';
import IndexSidebarRight from '../sidebars/sidebar-right/IndexSidebarRight';
import StickyFooter from '../footer/StickyFooter';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Banner from '../banner/Banner';

const Layout = ({ token, updateToken }) => {
  const params = useParams();
  console.log(params.page)
  let page = params.page ?? "home";
  console.log(page)

  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          paddingTop: '0',
          marginTop: '0',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Banner page={page} token={token} updateToken={updateToken} />
        <Container
          sx={{ display: 'flex', justifyContent: 'center'}}
        >
          <TabBar token={token} />
          {page !== 'physical' ? <IndexSidebarRight token={token} /> : null}
        </Container>
      </Box>
      <StickyFooter />
    </>
  );
};

export default Layout;

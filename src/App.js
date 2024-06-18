import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Fundraiser from './Fundraiser';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import ChooseCategory from './ChooseCategory';
import FundraisingGoal from './FundraisingGoal';
import UserDashboard from './UserDashboard';
import ProfilePictureUpload from './ProfilePictureUpload';
import FundraiserDetails from './FundraiserDetails';
import Header from './Header';
import FundraiserUpdateForm from './UpdateFundraiser';
import { SnackbarProvider } from 'notistack';
import AddRole from './AddRole';
import UserList from './UserList';
import RemoveRole from './RemoveRole';
import Donation from './Donation';
import ThankYou from './Thankyou';
import SearchFundraisers from './SearchFundraisers';
import PageNotFound from './PageNotFound';
import SignIn from './SignIn';
import NavbarII from './NavbarII';
import SignUp from './SignUp';
import Footer from './Footer';
import SearchDropdown from './SearchDropdown';
import FundraiserTable from './FundraiserTable';
import UsersTable from './UsersTable';
import UserDetail from './UserDetail';
// import Catagories from './Categories';
import Details from './Details';
import Blogs from './Blog';
import BlogsDetails from './BlogsDetail';
import BlogCreate from './BlogCreate';
import Unauthorized from './Unauthorized';
import { jwtDecode } from 'jwt-decode';
import AdminDashboard from './AdminDashboard';
import AboutUs from './AboutUs';
import Settings from './Settings';
import CreateRole from './CreateRole';
import UpdateRole from './UpdateRole';
import DeleteRole from './DeleteRole';
import BlogsTable from './BlogsTable';

const App = () => {
  const getToken = () => localStorage.getItem('user');
  const isAuthenticated = () => !!getToken();
  const getClaims = () => {
    const token = localStorage.getItem('user');
    const claims = token ? jwtDecode(token) : null;
  
    if (claims) {
      console.log('Claims:', claims);
    } else {
      console.log('No claims found in the token.');
    }
  
    return claims;
  };

  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900">
      <Router>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <div className=''>
            <ConditionalNavbar />
            <Routes>
              {/* Public Routes */}
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<AboutUs />}/>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/forgotpassword' element={<ForgotPassword />} />
              <Route path='/resetpassword' element={<ResetPassword />} />
              
              {/* Fundraisers */}
              <Route path='/fundraisers' element={<Fundraiser />} />
              <Route path='/fundraisers/:id' element={<FundraiserDetails />} />
              <Route path='/fundraisers/update/:id' element={<FundraiserUpdateForm />} />
              {/* Create fundraiser */}
              <Route path="/create/fundraiser/category" element={<PrivateRoute roles={[]}><ChooseCategory /></PrivateRoute>} />
              <Route path="/create/fundraiser/goal" element={<PrivateRoute roles={[]}><FundraisingGoal /></PrivateRoute>} />
              <Route path="/create/fundraiser/details" element={<PrivateRoute roles={[]}><Details /></PrivateRoute>} />

              <Route path='/fundraisers/search' element={<SearchDropdown />} />

              {/* User Profile */}
              <Route path='/profile/account' element={<PrivateRoute roles={[]}><Settings /></PrivateRoute>}/>
              <Route path='/profile' element={<PrivateRoute roles={[]}><UserDashboard /></PrivateRoute>}/>

              {/* Admin Routes */}
              <Route path='/admin' element={<PrivateRoute roles={['superuser']}><AdminDashboard /></PrivateRoute>} />
              <Route path="/admin/users" element={<PrivateRoute roles={['superuser']}><UserList /></PrivateRoute>} />
              <Route path="/admin/add-role/:email" element={<PrivateRoute roles={['superuser']}><AddRole /></PrivateRoute>} />
              <Route path="/admin/remove-role/:email" element={<PrivateRoute roles={['superuser']}><RemoveRole /></PrivateRoute>} />
              <Route path='/admin/fundraiserTable' element={<PrivateRoute roles={['superuser']}><FundraiserTable /></PrivateRoute>} />
              <Route path="/admin/user/:id" element={<PrivateRoute roles={['superuser']}><UserDetail /></PrivateRoute>} />
              <Route path='/admin/usersTable' element={<PrivateRoute roles={['superuser']}><UsersTable /></PrivateRoute>} />  
              <Route path='/admin/blogTable' element={<PrivateRoute roles={['superuser']}><BlogsTable /></PrivateRoute>} />  
              <Route path='/admin/roles/create' element={<PrivateRoute roles={['superuser']}><CreateRole /></PrivateRoute>} />
              <Route path='/admin/roles/update' element={<PrivateRoute roles={['superuser']}><UpdateRole /></PrivateRoute>} />
              <Route path='/admin/roles/delete' element={<PrivateRoute roles={['superuser']}><DeleteRole /></PrivateRoute>} />


              {/* Donations */}
              <Route path='/donate' element={<Donation />} />
              <Route path='/thank-you' element={<ThankYou />} />

              {/* Private Routes */}
              <Route path="/dashboard" element={<PrivateRoute roles={[]}><UserDashboard /></PrivateRoute>} />

              {/* Blog  */}
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/blogs/:id' element={<BlogsDetails />} />
              <Route path="/blog/create" element={<PrivateRoute roles={['superuser']}><BlogCreate /></PrivateRoute>} />

              {/* Unauthorized */}
              <Route path='/unauthorized' element={<Unauthorized />} />

              {/* PageNotFound */}
              <Route path='/*' element={<PageNotFound />} />

              {/* Catch All */}
              <Route path='*' element={<PageNotFound />} />
            </Routes>
            <ConditionalFooter />
          </div>
        </SnackbarProvider>
      </Router>
    </div>
  );
};

const ConditionalNavbar = () => {
  const location = useLocation();
  const noNavbarPaths = ['/signin', '/signup', '/forgotpassword', '/resetpassword', '/unauthorized', '/admin','/create'];

  const shouldShowNavbar = !noNavbarPaths.some(path => location.pathname.startsWith(path));

  return shouldShowNavbar ? <NavbarII /> : null;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const noNavbarPaths = ['/signin', '/signup', '/forgotpassword', '/resetpassword', '/unauthorized', '/admin','/create'];

  const shouldShowNavbar = !noNavbarPaths.some(path => location.pathname.startsWith(path));

  return shouldShowNavbar ? <Footer /> : null; 
};

export default App;
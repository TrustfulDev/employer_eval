import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Reviews', href: '#', current: true },
  { name: 'Bookmarks', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [name, setName] = useState([]);

  const [currUser, setCurrUser] = useState('');
  const [currEmail, setCurrEmail] = useState('');
  const [allUsers, setAllUsers] = useState([{}]);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {     // User is signed in
          setCurrUser(user.uid);
          setCurrEmail(user.email);
          fetchName();
        } else {
          setCurrUser('');
          setCurrEmail('');
          navigate('/');
        }
      });
    }, []);

  const fetchName = async () => {
    await getDocs(collection(db, "user"))
      .then((querysnapshot) => {
        const buffer = querysnapshot.docs.map((doc) => ({
          email:doc.data().email, 
          firstName:doc.data().firstName,
          id:doc.id 
        }));              
        setAllUsers(buffer);
      });

  }

  useEffect(() => {
    if (allUsers.length > 1)
      allUsers.forEach(e => e.email.toLowerCase() === currEmail.toLowerCase() ? setName(e.firstName) : "");
    // setName(currEmail);
  }, [allUsers])

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <Disclosure as="nav" className="bg-gray-900 fixed w-full shadow-md shadow-gray-800 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                    <Link to='/'><h1 className='text-2xl sm:text-xl xsm:hidden'>Employer<span className='text-purple-700'>Eval</span></h1></Link>
                    <Link to='/'><h1 className='hidden text-2xl sm:text-xl xsm:block'>E<span className='text-purple-700'>E</span></h1></Link>
                </div>
                <div className="hidden sm:ml-2 sm:block">
                  <div className="flex space-x-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to="/account"
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {currUser === '' ?
                <>
                  <Link to='/signup'>Sign Up</Link>
                  <Link to='/login' className='ml-8'>Login</Link>
                </>
                :
                <Menu as="div" className="relative">
                  <div className='flex justify-center items-center gap-5'>
                    <p className='md:hidden'>Welcome back, <span className='font-bold'>{name}</span></p>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 w-auto">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/account'
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/'
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={handleLogout}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                }
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                  onClick={() => navigate("/account")}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
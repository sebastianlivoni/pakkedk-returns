import { UserIcon, CollectionIcon, ClipboardCheckIcon, InboxIcon, ArchiveIcon, AdjustmentsIcon, BookmarkIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import mainLogo from'./images/pakkedkwhite.png';
import { Link, useLocation } from 'react-router-dom';
import AddReturn from './components/AddReturn';

const navigation = [
  { name: 'Dashboard', href: '/', current: true, icon: <InboxIcon /> },
  { name: 'All Returns', href: '/allreturns', current: false, icon: <CollectionIcon /> },
  { name: 'Your Returns', href: '/yourreturns', current: false, icon: <ArchiveIcon /> },
  { name: 'Ready to book pickup', href: '/readypickup', current: false, icon: <ClipboardCheckIcon /> },
  { name: 'Returns sent', href: '/returnssent', current: false, icon: <BookmarkIcon /> },
  { name: 'Returns recieved', href: 'https://docs.google.com/spreadsheets/d/1ZBrpPgaGxxN5hdo1eVWWKubqTIWe5zoQ0Hg-c0qiULY/edit', current: false, icon: <ClipboardCheckIcon /> },
  { name: 'Admin', href: '#', current: false, icon: <AdjustmentsIcon />, disabled: true },
  { name: 'Account', href: '/editaccount', current: false, icon: <UserIcon /> },
]

export default function SideBar() {

  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  
  const Toggle = () => setShowModal(!showModal);

  return (
    <>
      <div className="space-y-3">
        <div className="bg-indigo-500 py-7 fixed top-0 left-0 w-36">
          <img className="h-10 mx-auto" src={mainLogo} alt="Workflow"/>
        </div>
        <div className="pt-24 pb-20">
          {navigation.map((item) => (
            (item.href !== 'https://docs.google.com/spreadsheets/d/1ZBrpPgaGxxN5hdo1eVWWKubqTIWe5zoQ0Hg-c0qiULY/edit') ?
            <Link to={item.href} key={item.name}>
              <div className={location.pathname === item.href ? "bg-slate-900 text-white w-10/12 mx-auto py-4 rounded-md text-center text-sm cursor-pointer my-2" : "text-gray-400 w-10/12 mx-auto py-4 rounded-md text-center text-sm cursor-pointer hover:bg-slate-900 hover:text-white my-2"}>
                <div className="h-6 w-6 mx-auto mb-2">
                  {item.icon}
                </div>
                <p>{item.name}</p>
              </div>
            </Link>
            :
            <a href={item.href} target="_blank" rel="noreferrer" key={item.name}>
              <div className={item.current ? "bg-slate-900 text-white w-10/12 mx-auto py-4 rounded-md text-center text-sm cursor-pointer" : "text-gray-400 w-10/12 mx-auto py-4 rounded-md text-center text-sm cursor-pointer hover:bg-slate-900 hover:text-white"}>
                <div className="h-6 w-6 mx-auto mb-2">
                  {item.icon}
                </div>
                <p>{item.name}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="fixed left-0 bottom-0 bg-slate-800 h-20 w-36">
          <div className="mx-auto mx-2 mt-6">
            <button className="bg-indigo-500 py-2 w-full rounded-md text-white" onClick={() => {Toggle()}}>Add return</button>
          </div>
        </div>
      </div>
      <AddReturn show={showModal} close={Toggle} />
    </>
  )

}
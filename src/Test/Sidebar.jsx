import { UserIcon, CollectionIcon, ClipboardCheckIcon, InboxIcon, ArchiveIcon, AdjustmentsIcon, BookmarkIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import mainLogo from'../images/pakkedkwhite.png';
import { Link } from 'react-router-dom';
import AddReturn from './components/AddReturn';

const navigation = [
  { name: 'Dashboard', href: '/', current: true, icon: <InboxIcon /> },
  { name: 'All Returns', href: '/allreturns', current: false, icon: <CollectionIcon /> },
  { name: 'Your Returns', href: '/yourreturns', current: false, icon: <ArchiveIcon /> },
  { name: 'Ready to pickup', href: '/readypickup', current: false, icon: <ClipboardCheckIcon /> },
  { name: 'Returns sent', href: '/returnssent', current: false, icon: <BookmarkIcon /> },
  { name: 'Returns recieved', href: 'https://docs.google.com/spreadsheets/d/1ZBrpPgaGxxN5hdo1eVWWKubqTIWe5zoQ0Hg-c0qiULY/edit', current: false, icon: <ClipboardCheckIcon /> },
  { name: 'Admin', href: '#', current: false, icon: <AdjustmentsIcon />, disabled: true },
  { name: 'Account', href: '/editaccount', current: false, icon: <UserIcon /> },
]

export default function SideBar() {

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const Toggle = () => setShowModal(!showModal);

  return (
    <>
      <div className="bg-slate-800 relative w-36 space-y-3 min-h-screen">
        <div className="bg-indigo-500 py-7">
          <img className="mx-auto h-10" src={mainLogo} alt="Workflow"/>
        </div>
        {navigation.map((item) => (
          (item.href != 'https://docs.google.com/spreadsheets/d/1ZBrpPgaGxxN5hdo1eVWWKubqTIWe5zoQ0Hg-c0qiULY/edit') ?
          <Link to={item.href} key={item.name}>
            <div className={item.current ? "bg-slate-900 text-white w-10/12 mx-auto py-4 rounded-md text-center text-sm cursor-pointer" : "text-gray-400 w-10/12 mx-auto py-4 rounded-md text-center text-sm cursor-pointer hover:bg-slate-900 hover:text-white"}>
              <div className="h-6 w-6 mx-auto mb-2">
                {item.icon}
              </div>
              <p>{item.name}</p>
            </div>
          </Link>
          :
          <a href={item.href} target="_blank" key={item.name}>
            <div className={item.current ? "bg-slate-900 text-white w-10/12 mx-auto py-4 rounded-md text-center text-sm cursor-pointer" : "text-gray-400 w-10/12 mx-auto py-4 rounded-md text-center text-sm cursor-pointer hover:bg-slate-900 hover:text-white"}>
              <div className="h-6 w-6 mx-auto mb-2">
                {item.icon}
              </div>
              <p>{item.name}</p>
            </div>
          </a>
        ))}
      </div>
      <AddReturn show={showModal} close={Toggle} data={modalData} />
      <div className="mx-auto fixed bottom-3 left-2 w-28">
        <button className="bg-indigo-500 py-2 w-full rounded-md text-white" onClick={() => {Toggle()}}>Add return</button>
      </div>
    </>
  )

}
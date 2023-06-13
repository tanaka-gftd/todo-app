import Dropdown from '@/Components/Dropdown';
import TextInput from '@/Components/TextInput';
import { usePage } from '@inertiajs/react';

export default function Authenticated({ auth, header, children }) {
    const { url, component } = usePage();
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-black">
                <div className="flex justify-between px-32 py-10 items-center">
                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                        <span className="text-7xl text-white" style={{fontFamily:'Rammetto One'}}>My TODO</span>
                    </div>
                    <div className="bg-white flex relative rounded-lg w-1/4">
                        <div className='z-10 absolute top-3 left-3'>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                height="1.5em" 
                                viewBox="0 0 512 512"
                            >
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </div>
                        <div className={url === '/dashboard' ? 'w-full' : 'hidden'}>
                            <TextInput
                                placeholder="テキストを追加"
                                className="rounded-lg border-none pl-12 text-2xl leading-8 w-full"
                            />
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="flex rounded-md items-center">
                                        <button
                                            type="button"
                                            className="inline-flex items-center  border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-black hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 bg-black"
                                        >
                                            <span className="text-4xl text-white">{auth.user.name}さん</span>
                                        </button>
                                        <button type="button" className='bg-white rounded-full'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 0 512 512">
                                                <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
                                            </svg>
                                        </button>
                                        
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        プロフィール
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        ログアウト
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

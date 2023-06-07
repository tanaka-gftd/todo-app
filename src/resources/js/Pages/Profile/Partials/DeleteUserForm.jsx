import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>

            <DangerButton className="w-64" onClick={confirmUserDeletion}>
                        <span className='text-lg m-auto leading-10'>アカウントを削除</span>
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <div className='mx-24 mt-10'>
                    <form onSubmit={deleteUser} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 text-left">
                            本当に退会してもよろしいですか？
                        </h2>

                        <div className="mt-6">
                            <InputLabel htmlFor="password" value="Password" className="sr-only" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full"
                                isFocused
                                placeholder="パスワード"
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="my-10 flex justify-between">
                            <SecondaryButton className="w-48" onClick={closeModal}>
                                <span className='text-lg m-auto leading-10'>キャンセル</span>
                            </SecondaryButton>
                            <DangerButton className="w-48" disabled={processing}>
                                <span className='text-lg m-auto leading-10'>アカウントを削除</span>
                            </DangerButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </section>
    );
}

import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {    
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    /*
        設計図を見る限り、パスワードのリセット画面にパスワードの再入力項目がない。
        が、LaravelBreezeでパスワードのリセットするには、再入力されたパスワードの値が必要。
        なので、値をコピーすることで対処。
    */
    data.password_confirmation = data.password;
    
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');  //'password_confirmation'は省略可能と思われるが、念のため削除せず
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="パスワードの再設定" />

            <div className='mx-5'>
                <div className="text-4xl my-16">
                    パスワードの再設定
                </div>

                <form onSubmit={submit}>
                    
                    <div className="flex justify-between my-10 items-center">
                        <InputLabel className='text-xl' htmlFor="password" value="パスワード" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-96 text-xl"
                            autoComplete="current-password"
                            onChange={onHandleChange}
                            placeholder="テキストを追加"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                    <InputError message={errors.password} className="mt-2" />

                    <PrimaryButton className="mt-10 mb-14 border-solid border-2 border-blue-400 w-full" disabled={processing} >
                        <div className='text-lg leading-10 p-1 w-full'>
                            パスワードを再設定する
                        </div>
                    </PrimaryButton>
                </form>
            </div>
        </GuestLayout>
    );
}

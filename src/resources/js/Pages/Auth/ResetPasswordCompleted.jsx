import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function ResetPasswordCompleted() {

    return (
        <GuestLayout>
            <Head title="パスワード再設定完了" />
            <div className='mx-5'>
                <div className="text-4xl my-16">
                    パスワードの再設定
                </div>
                
                <p className="text-xl">パスワードの再設定を完了しました。</p>

                <div className="flex mt-10 mb-14 ml-1">
                    <Link
                        href={route('login')}
                        className="underline underline-offset-8 decoration-blue-400 text-xl text-blue-700 hover:text-gray-700 hover:decoration-gray-400"
                    >
                        トップページへ
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}

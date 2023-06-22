import SecondaryButton from '@/Components/SecondaryButton';

export default function TaskPageLeftSide() {
    return (
        <div className='text-2xl'>
            <div className='mb-8'>
                <p className='py-4'>すべて</p>
                <p className='py-4'>今日</p>
                <p className='py-4'>次の7日間</p>
            </div>

            <div>
                <ul>
                    <li className='py-4'>リスト1</li>
                    <li className='py-4'>リスト2</li>
                </ul>
                <SecondaryButton className='mt-4 mb-8 border-solid border-2 border-blue-500'>
                    <p className='text-xl text-blue-700 mt-1'>＋</p>
                    <p className='text-xl text-blue-700 mt-1'>リストを追加</p>
                </SecondaryButton>
            </div>
            
            <div>
                <p className='py-4'>タグ1</p>
                <p className='py-4'>タグ2</p>
            </div>
        </div>
    )
}
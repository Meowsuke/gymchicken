const Homepage = async () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          あなたの筋トレをもっとスマートに。
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mb-8">
          このサイトは、日々のトレーニングをシンプルに記録・管理できる
          <span className="font-semibold text-gray-800 dark:text-white">
            ワークアウト管理アプリ
          </span>
          です。
          <br />
          カレンダーで日付を選び、種目を追加し、重量や回数を入力するだけで、
          あなたの努力の積み重ねを可視化できます。
        </p>

        <div className="grid gap-6 sm:grid-cols-3 max-w-3xl">
          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
              カレンダー管理
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              トレーニングした日を一目で確認。
              月ごとの記録を簡単に振り返ることができます。
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
              種目とセット記録
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              種目ごとに重量・回数を記録。セットの編集や削除も簡単です。
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
              進捗の可視化
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              過去のデータを見返して、成長を実感。
              継続のモチベーションを高めます。
            </p>
          </div>
        </div>

        <a
          href="/workout"
          className="mt-10 inline-block bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition"
        >
          トレーニングを始める
        </a>
      </section>
    </>
  );
};

export default Homepage;

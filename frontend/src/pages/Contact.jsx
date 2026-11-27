
const Contact = () => {
  
  const items = [
    {
      title: 'Hỗ trợ tìm phòng',
      description: 'Giúp bạn tìm kiếm phòng trọ phù hợp với nhu cầu, ngân sách và khu vực mong muốn.',
    },
    {
      title: 'Hỗ trợ chủ nhà',
      description: 'Hướng dẫn đăng tin cho thuê và kết nối với những người đang có nhu cầu tìm phòng.',
    },
    {
      title: 'Hỗ trợ tài khoản',
      description: 'Giải đáp các vấn đề liên quan đến đăng ký, đăng nhập và quản lý tài khoản.',
    },
    {
      title: 'Báo cáo sự cố',
      description: 'Tiếp nhận phản hồi, báo cáo tin đăng không chính xác và xử lý các vấn đề phát sinh.',
    },
  ]

  return (
    <div className="min-h-screen bg-rent-background">
      <section className="bg-rent-primary px-6 py-20 text-center text-rent-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-200">
            Chúng tôi luôn sẵn sàng hỗ trợ
          </p>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Liên hệ với chúng tôi
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-8 text-blue-100 md:text-lg">
            Bạn đang tìm kiếm một căn phòng phù hợp hay cần hỗ trợ trong quá trình sử dụng hệ thống? Đừng ngần ngại liên hệ với chúng tôi. Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-rent-text">
            Chúng tôi có thể giúp gì cho bạn?
          </h2>
          <p className="text-rent-text-secondary">
            Mọi thắc mắc của bạn đều được chúng tôi quan tâm và hỗ trợ.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div key={index} className="rounded-2xl border border-rent-border bg-rent-surface p-7">
              <h3 className="mb-4 text-xl font-bold text-rent-primary">{item.title}</h3>
              <p className="text-sm leading-7 text-rent-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-rent-secondary px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-5 text-3xl font-bold text-rent-text">
              Kết nối với chúng tôi
            </h2>
            <p className="mb-10 leading-8 text-rent-text-secondary">
              Chúng tôi luôn mong muốn mang đến trải nghiệm tốt nhất cho người thuê và chủ nhà. Hãy liên hệ với chúng tôi nếu bạn cần tư vấn, giải đáp thắc mắc hoặc đóng góp ý kiến để hệ thống ngày càng hoàn thiện hơn.
            </p>

            <div className="space-y-7">
              <div>
                <h3 className="mb-2 font-bold text-rent-text">Email</h3>
                <p className="text-rent-text-secondary">support@timphong.vn</p>
              </div>
              <div>
                <h3 className="mb-2 font-bold text-rent-text">Hotline</h3>
                <p className="text-rent-text-secondary">1900 1234 56</p>
              </div>
              <div>
                <h3 className="mb-2 font-bold text-rent-text">Địa chỉ</h3>
                <p className="text-rent-text-secondary">Đà Nẵng, Việt Nam</p>
              </div>
              <div>
                <h3 className="mb-2 font-bold text-rent-text">Thời gian hỗ trợ</h3>
                <p className="text-rent-text-secondary">08:00 - 22:00, tất cả các ngày trong tuần</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-rent-border bg-rent-surface p-8 shadow-sm">
            <h2 className="mb-2 text-2xl font-bold text-rent-text">Gửi tin nhắn</h2>
            <p className="mb-8 text-sm leading-6 text-rent-text-secondary">
              Để lại thông tin bên dưới, chúng tôi sẽ liên hệ với bạn sớm nhất.
            </p>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-rent-text">Họ và tên</label>
                <input type="text" placeholder="Nhập họ và tên của bạn" className="w-full rounded-lg border border-rent-border bg-white px-4 py-3 text-sm text-rent-text outline-none focus:border-rent-primary focus:ring-2 focus:ring-rent-primary-light" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-rent-text">Email</label>
                <input type="email" placeholder="example@gmail.com" className="w-full rounded-lg border border-rent-border bg-white px-4 py-3 text-sm text-rent-text outline-none focus:border-rent-primary focus:ring-2 focus:ring-rent-primary-light" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-rent-text">Chủ đề liên hệ</label>
                <select className="w-full rounded-lg border border-rent-border bg-white px-4 py-3 text-sm text-rent-text outline-none focus:border-rent-primary">
                  <option>Hỗ trợ tìm phòng</option>
                  <option>Hỗ trợ đăng tin</option>
                  <option>Vấn đề tài khoản</option>
                  <option>Báo cáo sự cố</option>
                  <option>Đóng góp ý kiến</option>
                  <option>Khác</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-rent-text">Nội dung</label>
                <textarea rows="5" placeholder="Nhập nội dung bạn muốn gửi..." className="w-full resize-none rounded-lg border border-rent-border bg-white px-4 py-3 text-sm text-rent-text outline-none focus:border-rent-primary focus:ring-2 focus:ring-rent-primary-light" />
              </div>

              <button type="submit" className="w-full rounded-lg bg-rent-primary py-3 font-semibold text-white hover:bg-rent-primary-hover">
                Gửi liên hệ
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 text-3xl font-bold text-rent-primary">
            Tìm đúng phòng – Kết nối đúng người
          </h2>
          <p className="leading-8 text-rent-text-secondary">
            Cảm ơn bạn đã tin tưởng và lựa chọn nền tảng của chúng tôi. Chúng tôi không ngừng cải thiện hệ thống để mang đến trải nghiệm tìm kiếm, kết nối và thuê phòng trọ nhanh chóng, minh bạch và thuận tiện nhất.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Contact
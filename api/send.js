出口 默认 异步 功能处理程序(req，res) {
  res.setHeader('访问控制允许来源', '*');
  res.setHeader('访问控制允许方法', '帖子，选项');
  res.setHeader('访问控制允许标题', '内容类型');

  如果 (req.方法==='选项') {
    返回 res.状态(200).结束();
  }

  如果 (req.方法!=='POST') {
    返回 res.状态(405).JSON({ 误差: '仅支持POST请求' });
  }

  尝试 {
    Const身体=req.身体;
    Const电子邮件=身体.电子邮件;
    Const代码=身体.代码;

    如果 (!电子邮件|| !代码) {
      返回 res.状态(400).JSON({ 误差: '缺少电子邮件或代码参数' });
    }

    ConstSENDPULSE_ID='sp_id_c646e10a06308f8fecd1a2069d8719b6';
    ConstSENDPULSE_SECRET='sp_sk_e696ddc03f65f18deb18b365113ed3e9';
    Constsender_EMAIL='noreply@sendpulse.com';

    ConstokenRes=等候取来('https://api.sendpulse.com/oauth/access_token', {
      方法: 'POST',
      页眉: { '内容类型': '应用程序/约翰逊 },
身体：JSON.使字符串化({
        grant_type: 'client_credentials',
        client_id: SENDPULSE_ID,
        client_secret: SENDPULSE_SECRET
      })
    });

    Const权元=等候tokenRes.JSON();

    如果 (!权元.access_token) {
      返回 res.状态(500).JSON({
        误差: '获取SendPulse Token失败',
        细节: 权元
      });
    }

    ConsthtmlContent='<！doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>'+
      '正文{边距：0；填充：0；背景：#f5f7fa；字体系列：Simsun，衬线；}'+
      '.换行{max-width:400px；margin:0auto；padding:32px20px；}'+
      '。卡片{background：#fff；边框半径：16px；填充：28px；框阴影：04px20px rgba(0,0,0,0.08);}'+
      'h2{color:#3b82f6;text-align:center;margin:0 0 20px;font-size:20px;}'+
      'p{color：#64748b；font-size:14px；margin:0012px；}'+
      '。代码框{text-align:center；padding:18px；background：#f8fafc；border-radius:10px；margin:16px0；border:1.5px dashed#e2e8f0；}'+
      '.代码框跨度{font-size:32px；font-weight:bold；color：#1e293b；letter-spacing:10px；}'+
      '.提示{color：#94a3b8；font-size:12px；text-align:center；margin-top:16px；}'+
      '.footer{text-align:center;color:#cbd5e1;font-size:11px;margin-top:20px;}'+
      '</style></head><body>'+
      '<div class="wrap"><div class="card">'+
      '<h2>XY.Ghen校园网站平台</h2>'+
      '<p>您好，您的邮箱验证码为：</p>'+
      '<div class="codebox"><span>'+代码+'</span></div>'+
      '<p class="tip">验证码5分钟内有效，请勿泄露给他人。<br>如非本人操作，请忽略此邮件.</p>'+
      '<div class="footer">XY.Ghen校园网据平台·自动发送</div>'+
      '</div></div></body></html>';

    ConsthtmlBase64=缓冲器.从……起(htmlContent).toString('base64');

    ConstsendRes=等候取来('https://api.sendpulse.com/smtp/emails', {
      方法: 'POST',
      页眉: {
        '授权': '承载器'+权元.access_token,
        '内容类型': '应用程序/约翰逊
      },
      身体: JSON.使字符串化({
        电子邮件: {
          超文本标记语言: htmlBase64,
          文本: '您的验证码是：'+代码+'，5分钟内有效。如非本人操作请忽略。',
          主题: '[XY.Ghen]邮箱验证码',
          从……起: {
            姓名: 'XY.Ghen校园网据平台',
            电子邮件: sender_EMAIL
          },
          到: [{
            姓名: '用户',
            电子邮件: 电子邮件
          }]
        }
      })
    });

    Const结果=等候sendRes.JSON();

    返回 res.状态(200).JSON({ 成功: 正确, 结果: 结果 });

  } 赶上 (犯错) {
    返回 res.状态(500).JSON({ 误差: 犯错.消息 });
  }
}

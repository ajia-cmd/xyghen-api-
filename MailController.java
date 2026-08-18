进口组织弹簧框架。 豆子。 工厂。 注释。 自动布线；
进口组织弹簧框架。邮件。JavaMail.JavaMailSender；
进口组织弹簧框架。邮件。JavaMail.MimeMessageHelper；
进口组织弹簧框架。网。约束。annotation.GetMapping；
进口组织弹簧框架。网。约束。注释.RequestMapping；
进口组织弹簧框架。网。约束。注释。requestParam；
进口组织。弹簧框架。网。约束。注释。RestController；

进口javax.mail.MessagingException；
进口javax.mail.internet.MimeMessage；
进口java.util.HashMap；
进口java.util.Map；

@RestController
@RequestMapping("/api/mail")
公共班级MailController{
@Autowired
私人的JavaMailSender mailSender；

//内存存储：电子邮件→{代码，expanttime}，实例重启数据丢失
私人的静态的最终的地图<线，CodeItem>代码映射=新的HashMap<>()；
私人的静态的最终的长的expire_MS=5*60*1000；

静态的班级CodeItem{
        线 代码;
        长的 到期;
CodeItem(线代码，长的到期){
这.code=代码；
这.expire=expire；
        }
    }

//发送验证码
@GetMapping("/SendCode")
公共线SendCode(@requestParam 线电子邮件){
线代码=CodeUtil.get6Code()；
长的到期=系统。currentTimeMillis()+EXPIRE_MS；
代码映射。放(电子邮件，新的CodeItem(代码，过期))；

尝试 {
MimeMessage味精=mailSender。createMimeMessage()；
MimeMessageHelper助手=新的MimeMessageHelper(味精，正确，"UTF-8")；
助手。setFrom("2682203492@qq.com")；
助手。setto(电子邮件)；
助手。setSubject("校园网据平台验证码")；
            线 超文本标记语言="""
<h3>您的验证码是：<b>%s</b></h3>
<p>(一个人开发的项目)</p>
                    <p>如果有问题都是很正常的，请多给我反馈。</p>
<p>有效期间五分钟(请勿泄露).</p>
""".格式化的(代码);
助手。setText(超文本标记语言，正确)；
mailSender。发送(味精)；
            返回 "确定";
}赶上(MessagingException e){
e.printStackTrace()；
返回 "失败";
        }
    }

    //校验验证码
@GetMapping("/verifyCode")
公共线核实(@requestParam 线电子邮件，@requestParam 线代码){
CodeItem项=代码映射。得到(电子邮件)；
如果(项==无效的||系统。currentTimeMillis()>item.expire){
代码映射。移除(电子邮件);
返回 "过期";
        }
如果(项目代码。等于(代码)){
代码映射。移除(电子邮件);
返回 "成功";
}其他{
返回 "错误";
        }
    }
}

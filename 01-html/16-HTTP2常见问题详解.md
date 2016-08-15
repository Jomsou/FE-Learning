# HTTP/2 常见问题集锦

> 本文转载自：[众成翻译](http://www.zcfy.cc)
> 译者：[yanni4night](http://www.zcfy.cc/@yanni4night)
> 链接：[http://www.zcfy.cc/article/1026](http://www.zcfy.cc/article/1026)
> 原文：[https://http2.github.io/faq/](https://http2.github.io/faq/)

# HTTP/2 常见问题集锦

下面是关于 HTTP/2 的常见问答集锦。

*   [常见问题](#-b-id-general-questions-b-)
    *   [为什么修订 HTTP ？](#-b-id-why-revise-http-b-http-)
    *   [谁创造了 HTTP/2 ？](#-b-id-who-made-http2-b-http-2-)
    *   [与 SPDY 有什么关联？](#-b-id-whats-the-relationship-with-spdy-b-spdy-)
    *   [是 HTTP/2.0 还是 HTTP/2 ？](#-b-id-is-it-http20-or-http2-b-http-2-0-http-2-)
    *   [与 HTTP/1.x 有什么关键区别？](#-b-id-what-are-the-key-differences-to-http1x-b-http-1-x-)
    *   [为什么 HTTP/2 是二进制的？](#-b-id-why-is-http2-binary-b-http-2-)
    *   [为什么 HTTP/2 是多路复用的？](#-b-id-why-is-http2-multiplexed-b-http-2-)
    *   [为什么只用一个 TCP 连接？](#-b-id-why-just-one-tcp-connection-b-tcp-)
    *   [服务器推送的收益是什么？](#-b-id-whats-the-benefit-of-server-push-b-)
    *   [为什么需要压缩头部？](#-b-id-why-do-we-need-header-compression-b-)
    *   [为什么使用 HPACK ？](#-b-id-why-hpack-b-hpack-)
    *   [HTTP/2 可以让 cookies（或其它头部）更好吗？](#-b-id-can-http2-make-cookies-or-other-headers-better-b-http-2-cookies-)
    *   [非浏览器形式的 HTTP 用户该怎么办？](#-b-id-what-about-non-browser-users-of-http-b-http-)
    *   [HTTP/2 需要加密吗？](#-b-id-does-http2-require-encryption-b-http-2-)
    *   [HTTP/2 该如何提升安全性？](#-b-id-what-does-http2-do-to-improve-security-b-http-2-)
    *   [现在可以使用 HTTP/2 了吗？](#-b-id-can-i-use-http2-now-b-http-2-)
    *   [HTTP/2 会替换 HTTP/1.x 吗？](#-b-id-will-http2-replace-http1x-b-http-2-http-1-x-)
    *   [未来会有 HTTP/3 吗？](#-b-id-will-there-be-a-http3-b-http-3-)
*   [实现问题](#-b-id-implementation-questions-b-)
    *   [为什么规则会围绕头部帧的数据接续？](#-b-id-why-the-rules-around-continuation-on-headers-frames-b-)
    *   [HPACK状态的最小和最大尺寸是多少？](#-b-id-what-is-the-minimum-or-maximum-hpack-state-size-b-hpack-)
    *   [我怎样才能避免保持 HPACK 状态？](#-b-id-how-can-i-avoid-keeping-state-b-hpack-)
    *   [为什么会有一个单独的压缩/流控制上下文？](#-b-id-why-is-there-a-single-compressionflow-control-context-b-)
    *   [在 HPACK 中为什么会有一个 EOS 符号？](#-b-id-why-is-there-an-eos-symbol-in-hpack-b-hpack-eos-)
    *   [我可以实现 HTTP/2 而不实现 HTTP/1.1 吗？](#-b-id-can-i-implement-http2-without-implementing-http1-1-b-http-2-http-1-1-)
    *   [5.3.2 节中的优先级示例不正确吗？](#-b-id-is-the-priority-example-in-section-5-3-2-incorrect-b-5-3-2-)
    *   [我的 HTTP/2 的连接还需要 TCP_NODELAY 吗？](#-b-id-will-i-need-tcp_nodelay-for-my-http2-connections-b-http-2-tcp_nodelay-)
*   [部署问题](#-b-id-deployment-questions-b-)
    *   [我如何调试加密的 HTTP/2 ？](#-b-id-how-do-i-debug-http2-if-its-encrypted-b-http-2-)
    *   [我如何使用 HTTP/2 的服务器推送？](#-b-id-how-can-i-use-http2-server-push-b-http-2-)

## <b id="general-questions"></b>常见问题

### <b id="why-revise-http"></b>为什么修订 HTTP ？

HTTP/1.1 已经很好地服务 Web 超过 15 个年头，但它的缺点开始显现出来。

载入一个 Web 页面相比之前会占用更多的资源（详情可见[HTTP压缩页大小统计](http://httparchive.org/trends.php#bytesTotal&reqTotal)），高效的载入这些资源很难，因为 HTTP 实际上对每个 TCP 连接，只允许一个优先的 HTTP 请求。

在过去，对于并发请求，浏览器使用多个 TCP 连接。然而这也是有局限的；如果使用了过多的连接，则会有相反的效果（TCP 的流控机制导致发送窗口乘性递减，从而产生的拥塞事件影响了性能和网络的表现），同时从根本上来讲这也是不公平的（因为浏览器承载的资源需求大于它们享有的网络资源）。

此外，大量的请求意味着“线上”有很多重复的数据。

HTTP/1.1 在这两个问题上消耗了大量的资源。如果发起过多的请求，则会影响性能。

这些问题导致了像雪碧图、数据内联、域共享和文件合并有了最佳的实践场合。这些技巧正是底层协议问题的表现，并且在使用中也导致了它们自身的一系列问题。

### <b id="who-made-http2"></b>谁创造了 HTTP/2 ？

HTTP/2 由 [IETF](http://www.ietf.org/) 的 [HTTP 工作组](https://httpwg.github.io/)开发，他们也在维护着 HTTP 协议。他们由一群 HTTP 实现者、用户、网络运营商和 HTTP 专家组成。

注意虽然[我们的邮件列表](http://lists.w3.org/Archives/Public/ietf-http-wg/)托管在 W3C 的站点上，并工作并不是他们所承担。然而，Tim Berners-Lee 和 W3C TAG 与 WG 的进度保持了一致。

很多人对相关工作作出了贡献，不过大部分活跃的参与者都来自于像 Firefox、Chrome、Twitter、Microsoft 的 HTTP stack、Curl 和 Akamai 这样“大”项目的工程师，以及若干 Python、Ruby 和 NodeJS 的 HTTP 实现者。

要了解更多 IETF 的参与者，请看 [IETF 之道](http://www.ietf.org/tao.html)。你也可以在 [Github 的贡献者图表](https://github.com/http2/http2-spec/graphs/contributors)中了解到哪些人正在对规范做着贡献，以及在我们的[实现列表](https://github.com/http2/http2-spec/wiki/Implementations)中了解哪些人正在参与实现。

### <b id="whats-the-relationship-with-spdy"></b>与 SPDY 有什么关联？

HTTP/2 第一次出现并被讨论的时候，SPDY 正得到厂商 (像 Mozilla 和 nginx)的青睐，并被看成是基于 HTTP/1.x 的重大改进。

经过提议和投票流程之后，[SPDY/2](http://tools.ietf.org/html/draft-mbelshe-httpbis-spdy-00) 被选为 HTTP/2 的基础。直从那时起，根据工作组的讨论和厂商的反馈，它已经有了很多变化。

在整个过程中，SPDY 的核心开发成员都参与了 HTTP/2 的发展，其中包括了 Mike Belshe 和 Roberto Peon。

在 2015 年 2 月份，Google 发表了放弃 SPDY 转而支持 HTTP/2 的[声明](http://blog.chromium.org/2015/02/hello-http2-goodbye-spdy-http-is_9.html)。

### <b id="is-it-http20-or-http2"></b>是 HTTP/2.0 还是 HTTP/2 ？

工作组决定去掉小版本 (“.0”) ，因为它在 HTTP/1.x 中造成了很多困惑。

也就是说， HTTP 的版本*仅仅*代表它的线上兼容性，而不表示它的特性集合或者“市场吸引力”。

### <b id="what-are-the-key-differences-to-http1x"></b>与 HTTP/1.x 有什么关键区别？

宏观上来讲，HTTP/2：

*   基于二进制而不是文本的

*   完全多路复用，代替原来的排序和阻塞机制

*   在一条连接中并行处理多个请求

*   压缩头部减少开销

*   允许服务器主动推送响应到客户端的缓存中

### <b id="#why-is-http2-binary"></b>为什么 HTTP/2 是二进制的？

比起像 HTTP/1.x 这样的文本协议，二进制协议解析起来更高效、“线上”更紧凑，更重要的是错误更少，因为它对如空白字符、大小写、行尾、空行等的处理都更有效。

例如，HTTP/1.1 定义了[四个不同的方法来解析一条消息](http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.4)；在HTTP/2中，仅需一个代码路径即可。

HTTP/2 在 telnet 中将不可用，但是我们有一些工具提供支持，比如 [Wireshark 插件](https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=9042)。

### <b id="why-is-http2-multiplexed"></b>为什么 HTTP/2 是多路复用的？

HTTP/1.x 有个问题叫[队头阻塞](https://zh.wikipedia.org/wiki/%E9%98%9F%E5%A4%B4%E9%98%BB%E5%A1%9E)，即一个连接同时只能有效地承载一个请求。

HTTP/1.1 试过用流水线来解决这个问题，但是效果并不理想(数据量较大或者速度较慢的响应，仍然会阻碍排在后面的响应)。此外，由于网络中介和服务器都不能很好的支持流水线技术，导致部署起来困难重重。

客户端被迫使用一些启发式的算法（基本靠猜）来决定哪些连接来承载哪些请求；由于通常一个页面加载资源的连接需求，往往超过了可用连接资源的 10 倍，这对性能产生极大的负面影响，后果经常是引起了风暴式的阻塞。

而多路复用则能很好的解决这些问题，因为它能同时处理多个消息的请求和响应；甚至可以在传输过程中将一个消息跟另外一个糅合在一起。

所以客户端只需要一个连接就能加载一个完整的页面。

### <b id="why-just-one-tcp-connection"></b>为什么只用一个 TCP 连接？

在 HTTP/1 下，浏览器为每个域分配了 4 到 8 个连接。因为许多站点使用多个域，因此一般一个页面会加载 30 多个连接。

一个应用同时打开这么多连接，已经远远超出了当初设计 TCP 时的预期；由于每一个连接都会在响应中开启一个数据洪流，中介网络的缓存存在溢出的风险，结果导致网络堵塞和数据重传。

此外，使用这么多连接还会强占许多网络资源。这些资源都是从脾气好的其它应用那“偷”来的 ( VoIP 就是个例子)。

### <b id="whats-the-benefit-of-server-push"></b>服务器推送的收益是什么？

当浏览器请求一个网页时，服务器将会发回 HTML，在服务器开始发送 JavaScript、图片和 CSS 前，服务器需要等待浏览器解析 HTML 并发起所有内嵌资源的请求。

服务器推送服务通过“推送”那些它认为客户端将会需要的内容到客户端的缓存中，以此来避免往返的延迟。

### <b id="why-do-we-need-header-compression"></b>为什么需要压缩头部？

来自 Mozilla 的 Patrick McManus 通过计算头部对页面负载的平均影响度，清晰地说明了这个问题。

假设一个页面中有大约 80 个资源（对于今天的 Web 来说这个数字是比较保守的），并且每个头部有 1400 比特（同样并不罕见，多谢 Cookies、Referer 等），这就需要至少七八个往返传递头部。这还没有计算响应时间——那只是客户端获取它们所花的时间而已。

这是由于 TCP 的[慢启动](http://en.wikipedia.org/wiki/Slow-start)机制造成的，在新的连接上发送数据包的速度取决于有多少个数据包已经被确认——在最初的几轮中这有效限制了可以发送的数据包的数量。

作为对比，即使是轻微的头部压缩也可以是让那些请求只需一个来回就能搞定——有时候甚至一个数据包就可以了。

这种开销是可以被节省下来的，特别是当你考虑移动端应用的时候，即使是条件良好的情况下，一般也会看到几百毫秒的往返延迟。

### <b id="why-hpack"></b>为什么使用 HPACK ？

SPDY/2 曾提出在每个方向上都使用一个单独的 GZIP 上下文用于消息头的压缩，这实现起来很容易，也很高效。

从那时候开始，一种针对流压缩（如 GZIP）中加密算法的重要攻击方式被发现；[CRIME](http://en.wikipedia.org/wiki/CRIME)。

通过 CRIME，攻击者有能力在加密流中注入数据以“探测”文本内容并恢复它。由于是在 Web 环境中，JavaScript 使之成为了可能，并且，已经有在受 TLS 保护的 HTTP 资源中利用 CRIME 恢复 cookies 和鉴权令牌的先例。

因此，我们不能使用 GZIP 压缩。也没有找到其它安全和合适的压缩算法，我们就创造了一种新的、针对 HTTP 消息头的粗略压缩方案；由于 HTTP 的消息头在消息之间并不经常变化，因此我们可以得到合理的压缩效率，并且更加地安全。

### <b id="can-http2-make-cookies-or-other-headers-better"></b>HTTP/2 可以让 cookies（或其它头部）更好吗？

HTTP/2 是对现有运行的协议的修订，包括如何升级新的 HTTP 头部、方法，而不会影响 HTTP 的语义。

因为 HTTP 被使用得如此广泛，如果我们在这个版本中引入了一个新的状态机制（例如之前讨论过的例子）或者改变了核心方法（幸好没有人提起这件事），那么就意味着新的协议和现在的协议发生了不兼容。

特别要强调，我们需要的是无缝地从 HTTP/1 过渡到 HTTP/2。如果我们现在开始“清算”头部（大多数人会认同，HTTP消息头现在简直是一团糟），那么我们也就不得不面对现代 Web 中的互操作性问题。

那样做只会在采用新协议的过程中制造麻烦。

总而言之，[工作组](https://httpwg.github.io/)会对所有的 HTTP 负责，而不仅仅只是 HTTP/2。 因此，只要同现有的网络兼容，我们才可以独立于版本地运行新的机制。

### <b id="what-about-non-browser-users-of-http"></b>非浏览器形式的 HTTP 用户该怎么办？

非浏览器用户如果已经在使用 HTTP，那么也可以使用 HTTP/2。

之前收到过 HTTP/2 针对 HTTP “API” 有更好的性能特点的报告，因为 API 在设计时不需要考虑像请求开销这样的问题。

曾提到过，我们认为 HTTP/2 改进的重点是典型的浏览器环境，因为这是该协议的主要应用场景。

我们的[章程](http://datatracker.ietf.org/wg/httpbis/charter/)里面是这样说的:

```
最终的标准期望能针对已经部署的普通 HTTP 达到这些目标；特别地，包括 Web 浏览器（桌面和移动端）、非浏览器（“HTTP API”），网络服务（不同尺度的）、中介（代理、
企业防火墙，反向代理以及内容分发网络）。同样，当前和未来针对 HTTP/1.x （头部、方法、状态码、缓存指令）的语义化扩展也应该在新的协议中被支持。
注意这并不涵盖 HTTP 的非标准用法（比如连接状态的超时、客户端关联以及拦截代理）；它们都不会被最终启用。
```

### <b id="does-http2-require-encryption"></b>HTTP/2 需要加密吗？

不需要。经过广泛的讨论，工作组对于新的协议在加密（如 TLS）的使用上没有达成共识。

但是，在实现上厂商都已表明他们只会在加密连接下才会支持 HTTP/2，目前，没有浏览器支持不加密的 HTTP/2。

### <b id="what-does-http2-do-to-improve-security"></b>HTTP/2 该如何提升安全性？

HTTP/2 定义了一个所需 TLS 的基本描述信息；包括版本、密码套件和用到的扩展。

细节参见相关[规范](http://http2.github.io/http2-spec/#TLSUsage)。

此外也有额外的相关讨论，比如对 HTTP:// URL(所谓的“机会主义加密”)使用TLS；参见 [issue #315](https://github.com/http2/http2-spec/issues/315)。

### <b id="can-i-use-http2-now"></b>现在可以使用 HTTP/2 了吗？

在浏览器上，Edge、Safari、Firefox 和 Chrome 的近期版本都支持 HTTP/2。其它使用 Blink 内核的浏览器（Opera 和 Yandex）也都支持 HTTP/2。

此外还有几个可用的服务器（包括 [Akamai](https://http2.akamai.com/) 的 beta 版本，[Google](https://google.com/) 和 [Twitter](https://twitter.com/) 的主站），以及一些你可以部署和测试的开源实现。

详情请看[实现列表](https://github.com/http2/http2-spec/wiki/Implementations)。

### <b id="will-http2-replace-http1x"></b>HTTP/2 会替换 HTTP/1.x 吗？

工作组的目标是 HTTP/1.x 的典型应用_能够_使用 HTTP/2 并且看到收益。之前提到，我们不能强制大家迁移，因为人们部署代理和服务器的方式让 HTTP/1.x 在未来还会使用一段时间。

### <b id="will-there-be-a-http3"></b>未来会有 HTTP/3 吗？

如果 HTTP/2 的协商机制工作良好，未来会更容易升级到新的 HTTP 版本。

## <b id="implementation-questions"></b>实现问题

### <b id="why-the-rules-around-continuation-on-headers-frames"></b>为什么规则会围绕头部帧的数据接续？

数据接续的存在是由于一个值（如 Set-Cookie)可以超过 16kb - 1，这意味着它不可能全部装进一个帧里面。所以就决定以最不容易出错的方式让所有的消息头数据以一个接一个帧的方式传递，这样就使得对消息头的解码和缓冲区的管理更加的容易。

### <b id="what-is-the-minimum-or-maximum-hpack-state-size"></b>HPACK状态的最小和最大尺寸是多少？

接收一方总是会控制 HPACK 中内存的使用量，并且最小能设置到 0，最大则要看  SETTING 帧中能表示的最大整型数是多少，目前是 2^32 - 1。

### <b id="how-can-i-avoid-keeping-state"></b>我怎样才能避免保持 HPACK 状态？

发送一个 SETTINGS 帧将状态尺寸 (SETTINGS_HEADER_TABLE_SIZE) 设置到 0，然后 RST 所有的流，直到一个带有 ACT 设置位的 SETTINGS 帧发送了过来。

### <b id="why-is-there-a-single-compressionflow-control-context"></b>为什么会有一个单独的压缩/流控制上下文？

简单。

原来的提案中有流分组的概念，它会共享上下文和流控等。那样有利于代理 (也有利于使用它们的用户的体验)，而这样做相应也会增加一点复杂度。所以我们就决定先以一个简单的东西开头，看看它会带来多糟糕的问题，并且在未来的协议版本中解决这些问题（如果有的话）。

### <b id="why-is-there-an-eos-symbol-in-hpack"></b>在 HPACK 中为什么会有一个 EOS 符号？

考虑到 CPU 的效率和安全，HPACK 的哈夫曼编码填充了哈夫曼编码字符串到下一个字节边界。因此对于任何特定的字符串可能需要 0-7 个比特的填充。

如果单独考虑哈夫曼解码，任何比所需要的填充长的符号都可以正常工作。但是，HPACK 的设计允许按字节对比哈夫曼编码的字符串。通过填充 EOS 符号需要的比特，我们确保用户在做哈夫曼编码字符串字节级比较时是相等的。反过来许多头部可以在不需要哈夫曼解码的情况下被解析。

### <b id="can-i-implement-http2-without-implementing-http1.1"></b>我可以实现 HTTP/2 而不实现 HTTP/1.1 吗？

基本上是可以的。

对于运行在 TLS (`h2`) 之上的 HTTP/2 而言，如果你没有实现 `http1.1` 的 ALPN 标识，那你就不需要支持任何 HTTP/1.1 特性。

对于运行在 TCP (`h2c`) 之上的 HTTP/2 而言，你需要实现最初的升级（Upgrade）请求。

只支持 `h2c` 的客户端将需要生成一个请求 “\*” 的 OPTIONS 请求或者请求 “/” 的 HEAD 请求，它们绝对安全，并且也很容易构建。要实现 HTTP/2 的客户端将只需要把没有带上 101 状态码的 HTTP/1.1 响应看做是一个错误就行了。

只支持 `h2c` 的服务器可以使用一个固定的 101 响应来接收一个包含升级（Upgrade）消息头字段的请求。没有 `h2c` 的 Upgrade 令牌的请求可以使用一个包含了 Upgrade 消息头字段的 505（HTTP版本不支持）状态码来拒绝。那些不希望处理 HTTP/1.1 响应的服务器，应该在发送了带有鼓励用户升级到 HTTP/2 以重试的连接引导之后，立即用带有 REFUSED_STREAM 的错误码拒绝该请求的第一份数据流。

### <b id="is-the-priority-example-in-section-5.3.2-incorrect"></b>5.3.2 节中的优先级示例不正确吗？

不正确。流 B 的权重是 4，流 C 的权重是 12。为了判断每个流应分配的可用资源的比例，把各个权重加和（16），然后除各个流的权重。流 B 则分配四分之一的资源，流 C 分配四分之三的资源。因此，如标准中所言，[理论上流 B 的资源是流 C 的三分之一](http://http2.github.io/http2-spec/#rfc.section.5.3.2)。

### <b id="will-i-need-tcp_nodelay-for-my-http2-connections"></b>我的 HTTP/2 的连接还需要 TCP_NODELAY 吗？

是的，可能需要。即使对于那种只需要使用单个连接下载大量数据的客户端实现，一些数据包仍然需要反向发回以达到最大的传送速度。没有 TCP_NODELAY（但仍然允许 Nagle 算法），要发出去的数据包可能会被阻塞一会儿，以达到与后续数据包合并的目的。

如果有这样一个数据包，它的目的是告诉对方仍有增加发送窗口的空间，延迟它的发送几百毫秒（或更多）将会对高速连接产生负面的影响。

## <b id="deployment-questions"></b>部署问题

### <b id="how-do-i-debug-http2-if-its-encrypted"></b>我如何调试加密的 HTTP/2 ？

用许多方式可以访问应用的数据，最简单的方法是使用 [NSS keylogging](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/Key_Log_Format) 并配合 Wireshark 的插件（最近的基本开发版本）。这对 Firefox 和 Chrome 都有效。

### <b id="how-can-i-use-http2-server-push"></b>我如何使用 HTTP/2 的服务器推送？

HTTP/2 的服务器推送允许在不等待客户端请求的情况下向客户端提供内容。这可以节省请求的时间开销，特别是对于大型高延迟带宽的产品，它的网络交互时间主要消耗在资源上。

基于请求的内容推送不同的资源可能是不合适的。当前，浏览器只有在发起一个匹配请求（参见 [RFC 7234 第四部分](https://tools.ietf.org/html/rfc7234#section-4)）时才会使用推送的请求。

一些缓存并不对所有请求头都响应变化。即使被列在了 `Vary` 头中。为了最大限度地提高推送资源的利用率，最好避免内容协商。基于 `accept-encoding` 的内容协商广泛被缓存认可，但是其它头部则不太会被支持。
# HTTP报文首部详解

### 1. 通用首部（请求和响应都能使用的头部） p98

    Connection:  
    Date: 
    MIME-Version: 
    Trailer:
    Transfer-Encoding:
    Update: 
    Via:
    Cache-Control:
    Pragma:


### 2. 请求首部

##### 2.1 请求的信息性首部

    From:
    Host:
    Referrer:
    User-Agent:

##### 2.2 Accept首部

    Accept:
    Accept-Charset:
    Accept-Encoding:
    Accept-Language:
    TE:
    
##### 2.3 条件请求首部

    Expect:
    If-Match:
    If-None-Match:
    If-Modified-Since:
    If-Unmodified-Since:
    If-Range:
    Range:
    
##### 2.4 安全请求首部

    Authorization:
    Cookie:
    Cookie2:
    
##### 2.5 代理请求首部

    Max-Forward:
    Proxy-Authorization:
    Proxy-Connection:



### 3. 响应首部

##### 3.1 响应的信息性首部

    Age:
    Public:
    Retry-After:
    Server:
    Title:
    Warning:
    
##### 3.2 协商首部

    Accept-Ranges:
    Vary:
    
##### 3.3 安全响应首部

    Proxy-Authenticate:
    Set-Cookie:
    Set-Cookie2:
    WWW-Authenticate:


### 4. 实体首部（用于对应实体主体部分（body）的首部）

##### 4.1 实体的信息性首部

    Allow:
    Location:
    
##### 4.2 内容首部

    Content-Base:
    Content-Encoding:
    Content-Language:
    Content-Length:
    Content-Location:
    Content-MD5:
    Content-Range:
    Content-Type:
    
##### 4.3 实体缓存首部

    Cache-Control:
    Etag:
    Expires:
    Last-Modified:



### 5. 扩展首部(略)
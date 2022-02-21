package com.example.demo.provider;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.dto.AccessTokenDTO;
import com.example.demo.dto.GithubUser;
import okhttp3.*;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Component
public class GithubProvider {
    public String getAccessToken(AccessTokenDTO accessTokenDTO){
        MediaType mediaType = MediaType.get("application/json; charset=utf-8");

        OkHttpClient client = new OkHttpClient().newBuilder().connectTimeout(50000, TimeUnit.MILLISECONDS)
                .readTimeout(50000, TimeUnit.MILLISECONDS).build();
        RequestBody body = RequestBody.create(mediaType, JSON.toJSONString(accessTokenDTO));
        Request request = new Request.Builder()
                .url("https://github.com/login/oauth/access_token")
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {
            String string = response.body().string();
//            System.out.println(string);
            String[] split = string.split("&");
            String s = split[0].split("=")[1];
            System.out.println(s);
            return s;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public GithubUser getUser(String accessToken){
        OkHttpClient client = new OkHttpClient();
        Request request=null;
        try {
            request = new Request.Builder()
                    .url("https://api.github.com/user/repos")
                    .header("Authorization", "token " + accessToken)
                    .build();
        }catch(Exception e){}
        try (Response response = client.newCall(request).execute()) {
            String string = response.body().string();
            System.out.println(string);
//            GithubUser githubUser = JSON.parseObject(string, GithubUser.class);

//            JSONObject jsonObject = JSON.parseObject(string);
            JSONArray array = JSON.parseArray(string);
            JSONObject jsonObject = JSON.parseObject(array.get(0).toString());
            String s = jsonObject.getString("login");
            System.out.println("s:"+s);
            if(s != null) {
                GithubUser githubUser = new GithubUser();
                githubUser.setName(s);
                return githubUser;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}

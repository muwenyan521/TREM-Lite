![splash](.github/assets/splash.png)

<div align="center">
<a href="https://github.com/muwenyan521/TREM-Lite/tree/main"><img alt="status" src="https://img.shields.io/badge/status-stable-blue.svg"></a>
<a href="https://github.com/muwenyan521/TREM-Lite/releases/latest"><img alt="Release" src="https://img.shields.io/github/v/release/muwenyan521/TREM-Lite"></a>
<a href="https://github.com/muwenyan521/TREM-Lite/actions/workflows/github_actions.yml"><img alt="GitHub Workflow Status" src="https://github.com/muwenyan521/TREM-Lite/actions/workflows/github_actions.yml/badge.svg"></a>
<a href="https://good-labs.github.io/greater-good-affirmation"><img alt="Greater Good" src="https://good-labs.github.io/greater-good-affirmation/assets/images/badge.svg"></a>
<img alt="GitHub License" src="https://img.shields.io/github/license/muwenyan521/TREM-Lite">
<a href="https://exptech.dev/trem"><img alt="website" src="https://img.shields.io/badge/website-exptech.dev-purple.svg"></a>
<a href="https://discord.gg/5dbHqV8ees"><img alt="ExpTech Studio"  src="https://img.shields.io/discord/926545182407688273?color=%235865F2&logo=discord&logoColor=white"></a>
</div>

## 简介
TREM 是一款开源地震速报软件，为您提供即时的地震信息，利用自制的测站，显示各地的即时震度，在地震发生的第一时间取得各管道发布的强震即时警报信息。
### 强震即时警报
强震即时警报（Earthquake Early Warning, EEW），是藉由部署于各地之地震波观测站，在地震发生时将测得之地震波回传至服务器计算并产生地震速报，为你争取数秒甚至数十秒之时间，进行防灾应变及避难措施。
### TREM-Net 台湾即时地震观测网
TREM-Net 是一个 2022 年 6 月初开始于全台各地部署站点的项目，由两个观测网组成，分别为 **SE-Net**（强震观测网「加速度仪」）及 **MS-Net**（微震观测网「速度仪」），共同记录地震时的各项数据。
## 数据来源
所有数据皆来自以下单位：
### 官方来源
- [交通部中央气象署](https://www.cwa.gov.tw/)
- [国家灾害防救科技中心](https://www.ncdr.nat.gov.tw/)
### 非官方来源
- TREM-Net by [ExpTech Studio](https://exptech.dev/)
## 从原始码编译
1. 复制或下载存储库
- **下载压缩包**
你可以在 Github 上直接下载存储库压缩包
![Download Source ZIP](.github/assets/download_source.png)
- **使用 Git**
使用以下 git 指令来复制这个项目的原始码
```bash
git clone https://github.com/muwenyan521/TREM-Lite.git
```
2. 执行 `npm i` 下载 TREM-Lite 依赖
3. 执行 `npm run build` 编译
## 开放原始码授权
开放原始码授权信息请详见 [LICENSE](LICENSE) 文件
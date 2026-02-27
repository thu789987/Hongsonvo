import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "bLa1shfC4noziDsvmxjKJF",
      token: "n3UvqKCJgZOUR4SeWpH5SdfEkiopigEm1GKccQawWZzQI8VUk7qOMndpNhuEi1pYhu47QfQDyAzmqY2U4UGA",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: true,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// PLASMIC.registerComponent(...);
import Markdown from "./components/Markdown";
import TextRotator from "./components/TextRotator";
import { MasonryLayout } from "./components/MasonryLayout";
import HoverReveal from './components/HoverReveal'; // Nhớ import đúng đường dẫn
import { PatternGrid } from './components/PatternGrid';
import TypingAnimation from './components/TypingAnimation';
import { GridDistortion } from './components/GridDistortion';
import { RevealOnScroll } from './components/RevealOnScroll';
import { propagateServerField } from "next/dist/server/lib/render-server";
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollDetector } from './components/ScrollDetector';
import { HoverController } from './components/HoverController';
import { HackerText } from './components/HackerText';
import { HoverLogoCard } from './components/HoverLogoCard'; // Thêm dòng import này ở đầu file
import { RevealWidthOnScroll } from './components/RevealWidthOnScroll';
import { CustomCursorWrapper } from './components/CustomCursorWrapper'; // Thêm ở đầu file
import { InfiniteScroll } from './components/InfiniteScroll'; // Thêm ở đầu file
import { ScrollPlayVideo } from "./components/ScrollPlayVideo";
import { ScrollProvider } from "./components/ScrollContext";

PLASMIC.registerComponent(Markdown, {
  name: "Markdown",
  props: {
    markdown: {
      type: "string",
      control: "large"
    }
  },
  importPath: "./components/Markdown"
});


PLASMIC.registerComponent(TextRotator, {
  name: "textRotator",
  props: {
    text: {
      type: "object",
      defaultValue: ["Nhanh chóng", "Hiệu quả", "Đẹp mắt"],
      description: "Nhập danh sách chữ (dạng JSON array)",
    },
    interval: {
      type: "number", // Kiểu số
      defaultValue: 3000,
      description: "Thời gian đổi chữ (tính bằng ms, vd: 1000 = 1 giây)",
    },
  },
  importPath: "./components/TextRotator"
});

PLASMIC.registerComponent(MasonryLayout, {
  name: "MasonryGrid",
  props: {
    children: {
      type: "slot", // Biến nó thành một ô trống để bạn kéo thả các Card vào
      defaultValue: {
        type: "text",
        value: "Kéo các Card vào đây để tạo hiệu ứng so le"
      }
    },
    columns: {
      type: "object",
      description: "Cấu hình số cột cho từng màn hình",
      defaultValue: { default: 4, 1100: 3, 700: 2 }
    }
  },
  importPath: "./components/MasonryLayout"
});

PLASMIC.registerComponent(HoverReveal, {
  name: 'HoverReveal',
  props: {
    // Tạo một Slot tên là children. 
    // Trong Studio, bạn có thể kéo text, ảnh, button thả vào đây.
    children: {
      type: 'slot',
      defaultValue: {
        type: 'text',
        value: 'Kéo thả nội dung vào đây...',
      },
    },
    
    // Tạo một nút gạt để giữ trạng thái mở khi đang design
    previewForceOpen: {
      type: 'boolean',
      displayName: 'Force Open (Editor)',
      description: 'Bật cái này để chỉnh sửa nội dung bên trong dễ hơn',
      defaultValue: false,
    },
  },
  importPath: "./components/HoverReveal", // 👈 Đã thêm dòng này
});

PLASMIC.registerComponent(PatternGrid, {
  name: "PatternGrid",
  props: {
    children: "slot",
    // 👇 Thay thế 'gap' cũ bằng 2 dòng này
    rowGap: {
      type: "number",
      defaultValue: 16,
      displayName: "Row Gap (Dọc)",
    },
    columnGap: {
      type: "number",
      defaultValue: 16,
      displayName: "Column Gap (Ngang)",
    }
  },
  importPath: "./components/PatternGrid"
});

PLASMIC.registerComponent(TypingAnimation, {
  name: 'TypingAnimation',
  props: {
    text: {
      type: 'string',
      // Cập nhật hướng dẫn sử dụng ở đây
      defaultValue: 'UI/UX Design, Brand Identity, SEO Optimization, Web Development',
      description: 'Nhập các từ khóa ngăn cách bởi dấu phẩy (,) để chạy hiệu ứng lặp lại.',
    },
    speed: {
      type: 'number',
      defaultValue: 100,
      description: 'Tốc độ gõ (ms)',
    },
    delay: {
      type: 'number',
      defaultValue: 1500,
      description: 'Thời gian dừng lại khi gõ xong một từ (ms)',
    },
  },
});

PLASMIC.registerComponent(GridDistortion, {
  name: "GridDistortion",
  props: {
    // Chỉ cần chọn ảnh
    imageSrc: {
      type: "imageUrl",
      displayName: "Image Source",
      defaultValue: "https://picsum.photos/1920/1080",
    },
    enableEffect: {
      type: "boolean",
      defaultValue: true,
      displayName: "⚡ Enable Distortion", // Tên hiển thị cho dễ nhìn
      description: "Tắt đi để tăng tốc độ nếu máy bị lag"
    },
    // Các thông số chỉnh độ méo
    grid: {
      type: "number",
      defaultValue: 20,
      displayName: "Grid Size"
    },
    mouse: {
      type: "number",
      defaultValue: 0.1,
      displayName: "Mouse Radius"
    },
    strength: {
      type: "number",
      defaultValue: 0.25,
      displayName: "Distortion Strength"
    },
    relaxation: {
      type: "number",
      defaultValue: 0.9,
      displayName: "Relaxation"
    }
  },
  importPath: "./components/GridDistortion",
  isDefaultExport: false,
});

PLASMIC.registerComponent(RevealOnScroll, {
  name: "RevealOnScroll",
  props: {
    // Slot để thả các Layer khác vào
    children: {
      type: "slot",
      defaultValue: {
        type: "vbox",
        styles: { padding: "20px" },
        children: ["Kéo nội dung cần hiệu ứng vào đây"]
      }
    },
    // Các tùy chỉnh animation
    duration: {
      type: "number",
      displayName: "Duration (s)",
      defaultValue: 0.8,
      min: 0.1,
      max: 5,
      step: 0.1
    },
    delay: {
      type: "number",
      displayName: "Delay (s)",
      defaultValue: 0,
      min: 0,
      max: 5,
      step: 0.1
    },
    yOffset: {
      type: "number",
      displayName: "Y Distance (px)",
      defaultValue: 50,
      description: "Khoảng cách trồi lên (50 là vừa đẹp)"
    },
    blurAmount: {
      type: "number",
      displayName: "Blur Amount (px)",
      defaultValue: 5
  }
},
  importPath: "./components/RevealOnScroll"
});

PLASMIC.registerComponent(SmoothScroll, {
  name: "SmoothScroll",
  props: {
    children: "slot",
    duration: {
      type: "number",
      defaultValue: 1.2,
      displayName: "Smoothness (Duration)",
      description: "Độ trễ mượt (1.2 là chuẩn, 2.0 là rất mượt/chậm)",
      min: 0.1,
      max: 5,
      step: 0.1
    },
    wheelMultiplier: {
      type: "number",
      defaultValue: 1,
      displayName: "Scroll Speed",
      description: "Tốc độ cuộn (1 là mặc định, 2 là nhanh gấp đôi)",
      min: 0.1,
      max: 5,
      step: 0.1
    }
  },
  importPath: "./components/SmoothScroll"
});

PLASMIC.registerComponent(ScrollDetector, {
  name: "ScrollDetector",
  props: {
    children: "slot",
    threshold: {
      type: "number",
      defaultValue: 50,
      displayName: "Scroll Threshold"
    }
  },
  // Quan trọng: Khai báo dữ liệu đầu ra để Plasmic hiểu
  providesData: true, 
  importPath: "./components/ScrollDetector"
});

PLASMIC.registerComponent(HoverController, {
  name: "HoverController",
  props: {
    trigger: "slot",
    children: "slot",
    // 👇 Thêm sự kiện này vào
    onHoverChange: {
      type: "eventHandler",
      argTypes: [
        { name: "isHovered", type: "boolean" }
      ]
    }
  },
  providesData: true,
  importPath: "./components/HoverController"
});

PLASMIC.registerComponent(HackerText, {
  name: "HackerText",
  props: {
    text: {
      type: "string",
      defaultValue: "HOVER ME",
    },
    defaultColor: {
      type: "color",
      defaultValue: "#ffffff",
    },
    hoverColor: {
      type: "color",
      defaultValue: "#00ff00",
    }
  },
  importPath: "./components/HackerText", // Nhớ giữ dòng này không lại bị lỗi cũ nhé
  isDefaultExport: false,
});

PLASMIC.registerComponent(HoverLogoCard, {
  name: "HoverLogoCard",
  props: {
    // Tạo một Slot (cái hộp rỗng) để bạn kéo thả Card trên Plasmic vào
    children: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Kéo thả Card của bạn vào đây",
      },
    },
    // Nơi để bạn tải ảnh hoặc điền link logo công ty
    logoSrc: {
      type: "imageUrl",
      defaultValue: "https://via.placeholder.com/150",
    }
  },
  importPath: "./components/HoverLogoCard",
});

PLASMIC.registerComponent(RevealWidthOnScroll, {
  name: "RevealWidthOnScroll",
  props: {
    children: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Kéo thả phần tử cần giãn Width vào đây",
      },
    },
    duration: {
      type: "number",
      defaultValue: 0.8,
      description: "Thời gian kéo giãn (giây)",
    },
    delay: {
      type: "number",
      defaultValue: 0,
      description: "Độ trễ trước khi chạy (giây)",
    }
  },
  importPath: "./components/RevealWidthOnScroll",
});

PLASMIC.registerComponent(CustomCursorWrapper, {
  name: "CustomCursorWrapper",
  props: {
    children: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Kéo thả Video Card của bạn vào đây",
      },
    },
    cursorIcon: {
      type: "imageUrl",
      defaultValue: "https://cdn-icons-png.flaticon.com/512/724/724954.png", // Link icon nút Play mặc định
    }
  },
  importPath: "./components/CustomCursorWrapper",
});

PLASMIC.registerComponent(InfiniteScroll, {
  name: "InfiniteScroll",
  props: {
    children: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Kéo thả các Project vào đây",
      },
    },
    speed: {
      type: "number",
      defaultValue: 20,
      description: "Tốc độ: Thời gian hoàn thành 1 vòng (giây - càng nhỏ chạy càng nhanh)",
    },
    gap: {
      type: "number",
      defaultValue: 20,
      description: "Khoảng cách (px) giữa các phần tử",
    },
    pauseOnHover: {
      type: "boolean",
      defaultValue: true,
      description: "Tạm dừng băng chuyền khi rê chuột vào",
    },
direction: {
      type: "choice",
      options: ["left", "right"],
      defaultValue: "left",
      description: "Hướng chạy của băng chuyền",
    },
showFade: {
      type: "boolean",
      defaultValue: true,
      description: "Làm mờ dần 2 đầu băng chuyền giúp nhìn tự nhiên hơn"
    },
    // 👇 Thêm dòng này để chỉnh số lượng bản sao trên Plasmic
  repeatCount: {
      type: "number",
      defaultValue: 4,
      description: "Số lần nhân bản nội dung (Tăng lên nếu nội dung quá ngắn)",
    }
  },
  importPath: "./components/InfiniteScroll",
});

PLASMIC.registerComponent(ScrollPlayVideo, {
  name: "ScrollPlayVideo",
  props: {
    videoSrc: {
      type: "string",
      defaultValue: "https://scrollyvideo.js.org/goldengate.mp4",
      description: "Đường link file .mp4 của bạn",
    },
    transitionSpeed: {
      type: "number",
      defaultValue: 8,
      description: "Tốc độ phản hồi (Số nhỏ = Tua đầm, mượt, trễ nhiều / Số lớn = Tua gắt theo sát chuột)",
    }
  },
  importPath: "./components/ScrollPlayVideo",
});

PLASMIC.registerGlobalContext(ScrollProvider, {
  name: "ScrollProvider",
  providesData: true,
  props: {},
  
  // 👇 1. Sửa lại cho đúng tên file là ScrollContext
  importPath: "./components/ScrollContext", 
  
  // 👇 2. Khai báo rõ đây là một named export
  importName: "ScrollProvider" 
});
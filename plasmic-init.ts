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
import ScrollContext from "./components/ScrollContext";
import GlobalLoading from "./components/GlobalLoading";
import ScrollToTop from "./components/ScrollToTop";
import { CustomCursor } from "./components/CustomCursor";
import { CursorHoverWrapper } from "./components/CursorHoverWrapper"; // Thêm dòng này
import { AnimatedLineOnScroll } from "./components/AnimatedLineOnScroll"; // Nhớ trỏ đúng đường dẫn file của bạn
import { registerComponent } from '@plasmicapp/react-web/lib/host';
import { HoverVariantWrapper } from './components/HoverVariantWrapper';
import { CachedAirtable } from "./components/CachedAirtable"; // Đảm bảo đường dẫn đúng
import { CircularText } from "./components/CircularText"; // Đổi lại đường dẫn cho đúng
import { ZoomHoverCard } from "./components/ZoomHoverCard";

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
  importName: "ScrollPlayVideo", // 🎯 THÊM DÒNG NÀY: Để đảm bảo Plasmic sinh tên biến JS chuẩn, không bị lỗi cú pháp
  props: {
    videoSrc: {
      type: "string",
      displayName: "Link Video (.mp4)", // Thêm dòng này để hiển thị tiếng Việt trên giao diện cho đẹp
      defaultValue: "/public/video/video_timelaspe.mp4", // 💡 Đổi sang đường dẫn file local sau khi bạn đã convert bằng FFmpeg
      description: "Đường link file .mp4 của bạn",
    },
    transitionSpeed: {
      type: "number",
      displayName: "Tốc độ phản hồi",
      defaultValue: 8,
      description: "Tốc độ phản hồi (Số nhỏ = Tua đầm, mượt, trễ nhiều / Số lớn = Tua gắt theo sát chuột)",
    }
  },
  // 🎯 SỬA ĐƯỜNG DẪN: Nếu dự án của bạn dùng Alias @/ thì nên đổi thành "@/components/ScrollPlayVideo"
  // Còn nếu dùng đường dẫn tương đối thì để "./components/ScrollPlayVideo" cũng được, miễn là khớp với vị trí file thực tế.
  importPath: "@/components/ScrollPlayVideo", 
});

PLASMIC.registerComponent(ScrollContext, {
  name: "ScrollContext",
  props: {
    children: "slot",
  },
  importPath: "./components/ScrollContext",
  isDefaultExport: true, // 👈 Rất quan trọng vì file mới dùng export default
});

// Thêm "as any" vào sau component để TypeScript không tự ý bắt lỗi Overload nữa
PLASMIC.registerComponent(GlobalLoading as any, {
  name: "GlobalLoading",
  props: {
    barColor: "string",
    bgColor: "string",
    textColor: "string",
    textSize: "string",   // 👇 Bổ sung dòng này để chỉnh size chữ trên Studio
    durationMs: "number",
  },
  importPath: "./components/GlobalLoading",
  isDefaultExport: true,
});

PLASMIC.registerComponent(ScrollToTop as any, {
  name: "ScrollToTop",
  props: {}, // Component này chạy ngầm, không cần props gì cả
  importPath: "./components/ScrollToTop",
  isDefaultExport: true,
});

PLASMIC.registerComponent(CustomCursor as any, {
  name: "CustomCursor",
  props: {}, // Component này chạy ngầm, không cần props gì cả
  importPath: "./components/CustomCursor",
  isDefaultExport: false, // Vì mình dùng export function thay vì export default
});

PLASMIC.registerComponent(CursorHoverWrapper as any, {
  name: "CursorHoverWrapper",
  props: {
    children: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Wrap project card here",
      },
    },
  },
  importPath: "./components/CursorHoverWrapper",
});

PLASMIC.registerComponent(AnimatedLineOnScroll, {
  name: "AnimatedLineOnScroll",
  importPath: "./components/AnimatedLineOnScroll",
  props: {
    color: {
      type: "color",
      defaultValue: "#000000",
      description: "Màu sắc của đường kẻ",
    },
    duration: {
      type: "number",
      defaultValue: 0.8,
      description: "Thời gian chạy animation (giây)",
    },
    delay: {
      type: "number",
      defaultValue: 0,
      description: "Thời gian chờ trước khi chạy (giây)",
    },
  },
});

registerComponent(HoverVariantWrapper, {
  name: 'HoverVariantWrapper',
  displayName: 'Hover Variant Switcher',
  importPath: './components/HoverVariantWrapper',
  props: {
    children: {
      type: 'slot',
      defaultValue: {
        type: 'text',
        value: 'Thả component có variant vào đây',
      },
    },
    // 👇 THÊM NÚT BẬT/TẮT NÀY VÀO STUDIO
    isStandaloneVariant: {
      type: 'boolean',
      displayName: 'Là Biến thể độc lập (Không có nhóm)',
      description: 'Bật lên nếu Variant của bạn không nằm trong Group nào',
      defaultValue: true,
    },
    variantGroupName: {
      type: 'string',
      displayName: 'Tên Nhóm Variant',
      description: 'Chỉ cần điền nếu tắt nút phía trên',
      defaultValue: 'variant',
      hidden: (props: any) => props.isStandaloneVariant,    },
    baseVariant: {
      type: 'string',
      displayName: 'Tên Variant mặc định (VD: base)',
      defaultValue: 'base',
    },
    hoverVariant: {
      type: 'string',
      displayName: 'Tên Variant khi Hover (VD: project 1)',
      defaultValue: 'project1', // LƯU Ý: Với standalone variant, Plasmic thường bỏ dấu cách khi sinh code, ví dụ 'project 1' thành 'project1'
    },
  },
});

PLASMIC.registerComponent(CachedAirtable, {
  name: "CachedAirtable",
  displayName: "Google Sheets Multi-Tool",
  providesData: true,
  props: {
    children: {
      type: "slot",
      defaultValue: { type: "text", value: "Nội dung hiển thị ở đây" }
    },
    sheetId: {
      type: "string",
      displayName: "Google Sheet ID",
    },
    sheetName: {
      type: "string",
      displayName: "Tên Sheet",
      defaultValue: "Sheet1"
    },
    // PHẦN THÊM MỚI CHO DETAIL PAGE:
    filterField: {
      type: "string",
      displayName: "Cột để lọc (vd: slug)",
      description: "Nhập tên cột trong Google Sheets bạn dùng để định danh (vd: slug hoặc id)"
    },
    filterValue: {
      type: "string",
      displayName: "Giá trị lọc",
      description: "Ở trang Detail, hãy chọn Dynamic Value là $ctx.params.slug"
    }
  },
  importPath: "./components/CachedAirtable"
});

PLASMIC.registerComponent(CircularText, {
    name: "CircularText",
    displayName: "Circular Text",
    importPath: "./components/CircularText", // Chỉnh lại theo cấu trúc thư mục của bạn
    props: {
      text: {
        type: "string",
        defaultValue: "CONTACT US • ",
        displayName: "Text Content"
      },
      size: {
        type: "number",
        defaultValue: 300,
        displayName: "Size (px)"
      },
      duration: {
        type: "number",
        defaultValue: 20,
        displayName: "Speed (Seconds)"
      },
      fontSize: {
        type: "number",
        defaultValue: 24,
        displayName: "Font Size"
      },
      letterSpacing: {
        type: "number",
        defaultValue: 3,
        displayName: "Letter Spacing"
      },
      color: {
        type: "color",
        defaultValue: "#000000",
        displayName: "Text Color"
      }
    }
}); // <--- CHÚ Ý THÊM DẤU NGẶC TRÒN Ở ĐÂY

PLASMIC.registerComponent(ZoomHoverCard as any, {
  name: "ZoomHoverCard",
  displayName: "Zoom Hover Card", // Tên hiển thị đẹp mắt trên Studio
  props: {
    // Khai báo cho Plasmic biết đây là một cái "hộp rỗng" để kéo thả nội dung vào
    children: {
      type: "slot",
      defaultValue: {
        type: "vbox", // Mặc định hiển thị một khối dọc để dễ kéo thả
        styles: {
          padding: "20px",
          textAlign: "center",
        },
        children: {
          type: "text",
          value: "Kéo thả Project Card của bạn vào đây!",
        },
      },
    },
  },
  importPath: "./components/ZoomHoverCard",
});
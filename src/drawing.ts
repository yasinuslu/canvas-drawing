type Point2D = [number, number];

type Tool = {
  color: string;
};

type Session = {
  points: Point2D[];
  tool: Tool;
};

export class Drawing {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  _width: number;
  _height: number;

  isDrawing: boolean = false;

  sessions: Session[] = [];

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
    this.resize();
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
    this.resize();
  }

  tool: { color: string } = {
    color: "black"
  };

  constructor({ container }: { container: HTMLElement }) {
    this.container = container;

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.container.append(this.canvas);

    this.canvas.addEventListener("mousedown", this.handleTouchStart);
    this.canvas.addEventListener("mousemove", this.handleTouchMove);
    this.canvas.addEventListener("mouseup", this.handleTouchEnd);

    this.draw();
  }

  handleTouchStart = (e: MouseEvent | TouchEvent) => {
    this.isDrawing = true;

    const point = this.getPosition(e);
    this.sessions.push({ tool: { ...this.tool }, points: [point] });
  };

  handleTouchEnd = (e: MouseEvent | TouchEvent) => {
    this.isDrawing = false;
  };

  handleTouchMove = (e: MouseEvent | TouchEvent) => {
    if (!this.isDrawing) {
      return;
    }

    this.sessions[this.sessions.length - 1].points.push(this.getPosition(e));
  };

  draw = () => {
    const context = this.context;
    context.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.sessions.length; i++) {
      const session = this.sessions[i];

      context.fillStyle = session.tool.color;
      context.strokeStyle = session.tool.color;
      context.lineJoin = "round";
      context.lineWidth = 5;

      for (let j = 1; j < session.points.length; j++) {
        const point = session.points[j];
        const prev = session.points[j - 1];

        context.beginPath();
        context.moveTo(prev[0], prev[1]);
        context.lineTo(point[0], point[1]);
        context.stroke();
      }
    }

    requestAnimationFrame(this.draw);
  };

  resize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  getPosition(e: MouseEvent | TouchEvent): Point2D {
    const touch =
      "clientX" in e
        ? [e.pageX, e.pageY]
        : [e.touches[0].clientX, e.touches[1].clientY];

    return [
      touch[0] - this.canvas.offsetLeft,
      touch[1] - this.canvas.offsetTop
    ];
  }
}

require 'image_optim'
image_optim = ImageOptim.new(:pngout => false)
image_optim.optimize_image('a.png')

image_optim.optimize_images(Dir['../img/portfolio/*.png'].reject! {|image| image =~ /thumb/ } ) do |unoptimized, optimized|
  if optimized
    puts "#{unoptimized} => #{optimized}"
  end
end
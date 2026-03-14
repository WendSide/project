//class Test
//{
//
//
//    public $a = 0;
//    protected $b = 0;
//
//    public function calculate($a, $b)
//    {
//
//            return $a + $b;
//
//    }
//}
//$obj = new Test();
//print $obj-> calculate(22,8)




// индекс массы
//class Perso {
//    public $name;
//    public $family;
//    public $otch;
//    public $height;
//    public $weight;
//
//    function __construct($name, $family, $otch, $height, $weight)
//    {
//        $this->name = $name;
//        $this->family = $family;
//        $this->otch = $otch;
//        $this->height = $height;
//        $this->weight = $weight;
//
//
//    }
//
//
//    public function index()
//    {
//        return $this->weight / (($this->height * $this->height)/100);
//    }
//
//}
//
//
//$obj = new Perso("Vitalya", "Kuvalda", "Ivanovich", "190", "100");
//print $obj-> index();

class Pycyler{

    public $r;

    const PI=3.14;
    public function __construct($r)
    {
        $this->r=$r;
    }
    public function v()
    {
        return self::PI*($this->r*$this->r);
    }
}

$obj = new Pycyler(5);
print $obj->v();

?>
